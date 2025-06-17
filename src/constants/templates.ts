export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: ""
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5;">
  <div style="max-width: 800px; background: #fff; margin: 50px auto; padding: 50px; border: 1px solid #ddd; position: relative;">

    <div style="position: absolute; top: 0; right: 0; width: 120px; height: 120px; background: repeating-linear-gradient(45deg, #ccc, #ccc 10px, #fff 10px, #fff 20px); opacity: 0.2; clip-path: polygon(0 0, 100% 0, 100% 100%);"></div>

    <div style="color: #7f3fbf; font-size: 24px; font-weight: bold;">Your Company</div>

    <div style="margin: 10px 0; font-size: 14px; color: #333;">
      123 Your Street<br />
      Your City, ST 12345<br />
      (123) 456-7890<br />
      no_reply@example.com
    </div>

    <div style="color: #e60073; font-weight: bold; margin: 20px 0;">September 04, 20XX</div>

    <div style="margin: 10px 0; font-size: 14px; color: #333;">
      Ms. Ronny Reader<br />
      123 Address St<br />
      Anytown, ST 12345
    </div>

    <div style="margin-top: 20px; font-size: 14px; line-height: 1.6; color: #222;">
      <p>Dear Ms. Reader,</p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</p>
      <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</p>
      <p>Best regards,</p>

      <div style="margin-top: 40px;">
        <div style="font-weight: bold;">Your Name</div>
        <div style="color: #666;">CEO, Your Company</div>
      </div>
    </div>

    <div style="position: absolute; bottom: 0; right: 0; width: 150px; height: 80px; background: linear-gradient(135deg, #b32891 0%, #e60073 100%); clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);"></div>

  </div>
</body>

        `
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: ""
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
     initialContent: ""
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: ""
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg", 
    initialContent: ""
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: ""
  },
];
