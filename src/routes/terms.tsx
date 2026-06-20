import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Usage Terms and Conditions | Dhaka Stock Exchange" },
      { name: "description", content: "Terms and conditions governing use of the Dhaka Stock Exchange website." },
      { property: "og:title", content: "Usage Terms and Conditions — DSE" },
      { property: "og:description", content: "Terms governing use of the DSE website." },
    ],
  }),
  component: TermsPage,
});

const INTRO = [
  `Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Dhaka Stock Exchange PLC.'s relationship with you in relation to this website.`,
  `The term 'Dhaka Stock Exchange PLC.' or 'us' or 'we' refers to the owner of the website whose registered office is 'STOCK EXCHANGE BUILDING, 9/F MOTIJHEEL C/A, DHAKA BANGLADESH'. The term 'you' refers to the user or viewer of our website. The use of this website is subject to the following terms of use:`,
];

const BULLETS = [
  `The content of the pages of this website is for your general information and use only. It is subject to change without notice.`,
  `Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.`,
  `Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.`,
  `All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.`,
  `This website contains material which is owned by or licensed or copyright to us. This material includes, but is not limited to, the design, layout, look, appearance, graphs, trade data, live ticker and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions and unless prior permission is obtained.`,
  `Unauthorised use of this website (including copying the source code or any other material and telecasting/broadcasting them without prior written permission) may give rise to a claim for damages and/or be a criminal offence.`,
  `From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).`,
  `You may not create a link to this website from another website or document without Dhaka Stock Exchange PLC.'s prior written consent.`,
  `Your use of this website and any dispute arising out of such use of the website is subject to the laws of Bangladesh.`,
];

const LIMITATION = `There may be delays, omissions, errors, or inaccuracies in the content, and the content is provided to you on an "as is" basis without warranties of any kind. DSE, the third party providers, and their respective affiliates, officers, directors, employees, agents and licensors cannot and do not make any representations and, to the fullest extent permitted by applicable law, hereby disclaim with respect to the DSE web-site and the content all express, implied and statutory warranties of any kind to you or any third party, including, but not limited to, representations and warranties regarding accuracy, timeliness, completeness, currentness, reliability, stability, readiness, non-infringement, merchantability, or fitness for any particular purpose. DSE assumes no responsibility for the consequences of any errors or omissions. Any material, information or content downloaded or otherwise obtained through the use of the DSE web-site is accessed at your own risk and discretion and you alone will be responsible for any damage or loss to you. In no event shall DSE or any third party provider or any of their respective affiliates, officers, directors, employees, agents or licensors be liable to you or to anyone else for any direct, special, incidental, indirect, punitive, consequential damages or any other loss or injury, even if advised of the possibility of such damages.`;

function TermsPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Legal
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Usage Terms and Conditions
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Terms governing your use of the Dhaka Stock Exchange website.
          </p>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-5">
        {INTRO.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{p}</p>
        ))}
        <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          {BULLETS.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="pt-4">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--brand-600)" }}>
            Limitation of Liability
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{LIMITATION}</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
