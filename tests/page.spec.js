import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop: imagens, links, acessibilidade e captura visual", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll((images) =>
    Promise.all(
      images.map((image) => {
        image.loading = "eager";
        return image.decode();
      }),
    ),
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("imobiliários");
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((image) => image.complete && image.naturalWidth > 0),
      ),
  ).toBe(true);
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links.every((link) =>
          document.querySelector(link.getAttribute("href")),
        ),
      ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.locator('#atuacao').screenshot({ path: 'test-results/desktop-services.png' });
  await page.locator('#escritorio').screenshot({ path: 'test-results/desktop-about.png' });
  await page.locator('#contato').screenshot({ path: 'test-results/desktop-contact.png' });
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    accessibility.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.failureSummary),
    })),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("contato: qualificação, validação, resumo, edição e ausência de envio automático", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Converse sobre seu contrato" }).click();
  await expect(page.locator("#interest")).toHaveValue("Contratos imobiliários");
  await page
    .getByRole("button", { name: "Preparar contato por e-mail" })
    .click();
  await expect(page.locator("#contact-form")).toBeVisible();
  await expect(page.locator("#email-preview")).toBeHidden();
  await page.getByLabel("Seu nome").fill("Contato de Teste");
  await page.getByLabel("E-mail", { exact: false }).fill("teste@example.com");
  await page.getByLabel("Como você atua").selectOption("Construtora");
  await page
    .getByLabel("Um breve resumo")
    .fill("Revisão de contrato de permuta.");
  await page
    .getByRole("button", { name: "Preparar contato por e-mail" })
    .click();
  await expect(page.locator("#email-preview")).toBeVisible();
  await expect(page.locator("#draft-text")).toContainText(
    "Perfil: Construtora",
  );
  await expect(page.locator("#draft-text")).toContainText(
    "Revisão de contrato de permuta.",
  );
  const href = await page.locator("#email-link").getAttribute("href");
  expect(decodeURIComponent(href)).toContain(
    "mailto:contato@fglaw.com.br?subject=Contato imobiliário — Contratos imobiliários",
  );
  expect(decodeURIComponent(href)).toContain("teste@example.com");
  await expect(page.locator("#email-preview")).toContainText(
    "A mensagem ainda não foi enviada",
  );
  await page.getByRole("button", { name: "Editar dados" }).click();
  await expect(page.locator("#name")).toHaveValue("Contato de Teste");
  await expect(page.locator("#email-preview")).toBeHidden();
  await page.getByRole("link", { name: "Converse sobre seu imóvel" }).click();
  await expect(page.locator("#interest")).toHaveValue(
    "Regularização de imóveis e áreas",
  );
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await page.context().cookies()).toHaveLength(0);
  await expect(
    page.locator('a[href*="wa.me"], a[href*="whatsapp"]'),
  ).toHaveCount(0);
});

test("FAQ e privacidade funcionam por teclado", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText("Quando avaliar uma SPE ou uma SCP?", {
    exact: false,
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question.locator("..")).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Sobre seus dados" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

for (const width of [360, 390, 768, 1024]) {
  test(`layout sem transbordamento em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width === 390) {
      await page.locator("img").evaluateAll((images) =>
        Promise.all(
          images.map((image) => {
            image.loading = "eager";
            return image.decode();
          }),
        ),
      );
      await page.screenshot({
        path: "test-results/mobile.png",
        fullPage: true,
      });
      await page.screenshot({ path: "test-results/mobile-hero.png" });
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(page.locator("#menu-principal")).toBeVisible();
      await page
        .locator("#menu-principal")
        .getByRole("link", { name: "Atuação", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toHaveAttribute("aria-expanded", "false");
      await page.locator(".mobile-contact").click();
      await expect(page.locator(".mobile-contact")).toHaveClass(/is-hidden/);
      await expect(page.locator("#contact-form")).toBeVisible();
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        accessibility.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.failureSummary),
        })),
      ).toEqual([]);
    }
  });
}
