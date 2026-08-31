import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { starlightBasePath } from "starlight-base-path";

export default defineConfig({
  site: "https://route53-classic-multi-account-walkthrough.johna.kiwi",
  base: "/",
  integrations: [
    starlight({
      title: "Amazon Route 53 Classic Multi-Account Walkthrough",
      favicon: "/favicon.svg",
      description:
        "Step-by-step walkthrough for classic Route 53 private DNS sharing across AWS accounts and regions using VPC association authorization.",
      plugins: [starlightBasePath()],
      routeMiddleware: "./src/routeData.ts",
      customCss: [
        "./src/styles/patina-tokens.css",
        "./src/styles/splash-overrides.css",
      ],
      components: {
        ThemeSelect: "./src/components/ThemeSelect.astro",
        Head: "./src/components/Head.astro",
      },
      social: [
        {
          icon: "github",
          label: "Source Repository",
          href: "https://github.com/jajera/route53-classic-multi-account-walkthrough",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/jajera/route53-classic-multi-account-walkthrough/edit/main/",
      },
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Introduction",
          items: [
            { label: "Overview", slug: "walkthrough/01-overview" },
            { label: "Why Classic", slug: "walkthrough/02-why-classic" },
          ],
        },
        {
          label: "Prerequisites",
          items: [
            {
              label: "Tools and Accounts",
              slug: "walkthrough/03-prerequisites",
            },
            { label: "Pre-flight", slug: "walkthrough/04-preflight" },
          ],
        },
        {
          label: "Architecture",
          items: [
            {
              label: "System Overview",
              slug: "architecture/01-system-overview",
            },
            {
              label: "Association Scenarios",
              slug: "architecture/02-association-scenarios",
            },
            {
              label: "DNS Resolution Path",
              slug: "architecture/03-dns-resolution-path",
            },
            {
              label: "Security Boundaries",
              slug: "architecture/04-security-boundaries",
            },
          ],
        },
        {
          label: "Deploy",
          items: [
            { label: "Deployment Phases", slug: "walkthrough/05-phases" },
          ],
        },
        {
          label: "Verification",
          items: [
            { label: "DNS Verification", slug: "walkthrough/06-verification" },
          ],
        },
        {
          label: "Troubleshooting",
          items: [
            { label: "Common Issues", slug: "walkthrough/07-troubleshooting" },
          ],
        },
        {
          label: "Reference",
          items: [{ label: "Teardown", slug: "walkthrough/08-teardown" }],
        },
      ],
    }),
  ],
});
