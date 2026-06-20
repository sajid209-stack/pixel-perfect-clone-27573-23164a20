import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/dse/Nav";
import { Footer } from "@/components/dse/Footer";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | Dhaka Stock Exchange" },
      { name: "description", content: "Terms and conditions governing use of the Dhaka Stock Exchange website." },
      { property: "og:title", content: "Disclaimer — DSE" },
      { property: "og:description", content: "Terms governing use of the DSE website." },
    ],
  }),
  component: DisclaimerPage,
});

const PARAGRAPHS = [
  `These terms and conditions (the "Terms") govern your access to and use of this website. Please read these Terms carefully. By continuing to access and use the Website you are deemed to have understood and agreed to the Terms.`,
  `The information contained in this website is for general information purposes only. The information is provided by Dhaka Stock Exchange PLC. and while it endeavours to keep the information up to date and correct, it makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.`,
  `In no event will Dhaka Stock Exchange PLC. be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.`,
  `Through this website you are able to link to other websites which are not under the control of Dhaka Stock Exchange PLC. Dhaka Stock Exchange PLC. has no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.`,
  `Every effort is made to keep the website up and running smoothly. However, Dhaka Stock Exchange PLC. takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.`,
];

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. WEBSITE CONTENT",
    body: `This Website contains text, data, graphics, photographs, illustrations, artwork, names, logos, trademarks, service marks, tickers, software programmes and information connected with Dhaka Stock Exchange PLC. ("Information"). The Exchange attempts to ensure Information is accurate, however Information is provided "AS IS" and on an "AS AVAILABLE" basis and may not be accurate or up to date. Information on this Website may or may not have been prepared by the Exchange but is made available without responsibility on the part of the Exchange. The Exchange does not guarantee the accuracy, timeliness, completeness, performance or fitness for a particular purpose of the Website or any of the Information. No responsibility is accepted by or on behalf of the Exchange for any errors, omissions, or inaccurate Information on the Website. No action should be taken or omitted to be taken in reliance upon Information on this Website. We accept no liability for the results of any action taken on the basis of the Information. Certain files of Information are available for download from the Website. These files of Information are subject to these Terms.`,
  },
  {
    title: "2. INFORMATION COLLECTED",
    body: `We collect information from all of our users – from figuring out basic data like personal information of the users, trading data, device data and cookies for better services. We collect information in the following ways: Information you give us — our services require you to register for taking full advantage of the shared features we offer; when you do, we'll ask for personal information like your investor code, name, email address, residential information, telephone number and photograph to store at your account. Information we get from your use of our services — we collect information about the services that you use and how you use them. This includes device information, log information, location information, unique application numbers, local storage, and cookies and similar technologies. Information collected when you are signed in to DSE services may be associated with your trading Account, and when so associated is treated as personal information.`,
  },
  {
    title: "3. LIABILITY",
    body: `All implied warranties, including but not limited to the implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security and accuracy are excluded from these Terms to the extent that they may be excluded as a matter of law. Further, the Exchange does not warrant that the Website will be uninterrupted or error free or that any defects will be corrected. To the extent permitted by applicable law, the Exchange expressly disclaims all liability howsoever arising whether in contract, tort (or deceit) or otherwise (including, but not limited to, liability for any negligent act or omissions) to any person in respect of any claims or losses of any nature, arising directly or indirectly from: (i) anything done or the consequences of anything done or omitted to be done wholly or partly in reliance upon the whole or any part of the contents of this Website; and (ii) the use of any data or materials on this Website or unauthorised access to this Website or otherwise. The Exchange will not be responsible for any breach of these Terms caused by circumstances beyond its reasonable control.`,
  },
];

function DisclaimerPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <section className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--brand-600)" }}>
            Legal
          </div>
          <h1 className="mt-2 text-[26px] md:text-[34px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            Disclaimer
          </h1>
          <p className="mt-3 text-[14px] max-w-[720px]" style={{ color: "var(--text-secondary)" }}>
            Terms and conditions governing your access to and use of the Dhaka Stock Exchange website.
          </p>
        </div>
      </section>
      <section className="max-w-[960px] mx-auto px-4 md:px-6 py-8 md:py-10 space-y-5">
        {PARAGRAPHS.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{p}</p>
        ))}
        {SECTIONS.map((s) => (
          <div key={s.title} className="pt-4">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "var(--brand-600)" }}>
              {s.title}
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>{s.body}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
