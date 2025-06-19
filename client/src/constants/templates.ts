import { TFunction } from "i18next";

export const templates = (t: TFunction<"translation", undefined>) => [
  {
    id: "blank",
    label: t("documents.Blank Document"),
    description: t("documents.Blank Document description"),
    imageUrl: "/blank-document.svg",
    initialContent: ``,
  },
  {
    id: "software-proposal",
    label: t("documents.Software Development Proposal"),
    description: t("documents.Software Development Proposal description"),
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>1. Project Overview</h2>
      <p>This proposal outlines a software development project aimed at solving a specific problem or fulfilling a defined business need. The project will follow modern development practices and deliver a high-quality solution on time and within budget.</p>

      <h2>2. Objectives</h2>
      <ul>
        <li>Identify client requirements</li>
        <li>Design and develop the software solution</li>
        <li>Test and deploy the final product</li>
      </ul>

      <h2>3. Scope of Work</h2>
      <p>The scope includes planning, UI/UX design, backend and frontend development, quality assurance, and deployment.</p>

      <h2>4. Timeline</h2>
      <p>Project duration: 12 weeks from the approval date. A detailed timeline will be provided upon agreement.</p>

      <h2>5. Budget Estimate</h2>
      <p>Estimated total cost: $25,000. A detailed cost breakdown can be added here.</p>

      <h2>6. Contact Information</h2>
      <p>Submitted by: [Your Company Name]  
      Email: contact@yourcompany.com</p>
    `,
  },
  {
    id: "project-proposal",
    label: t("documents.Project Proposal"),
    description: t("documents.Project Proposal description"),
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>1. Introduction</h2>
      <p>This document proposes the implementation of [Project Title], intended to address [problem or opportunity].</p>

      <h2>2. Goals</h2>
      <ul>
        <li>Goal 1: Define the primary objective</li>
        <li>Goal 2: Describe desired outcomes</li>
      </ul>

      <h2>3. Methodology</h2>
      <p>Outline of the approach, tools, or methods that will be used to achieve the goals.</p>

      <h2>4. Resources Required</h2>
      <p>List of personnel, software, hardware, or budget needed for the project.</p>

      <h2>5. Timeline</h2>
      <p>Estimated start and end dates, along with milestone targets.</p>

      <h2>6. Conclusion</h2>
      <p>This proposal provides a structured approach to executing the project. Approval is requested to proceed.</p>
    `,
  },
  {
    id: "business-letter",
    label: t("documents.Business Letter"),
    description: t("documents.Business Letter description"),
    imageUrl: "/business-letter.svg",
    initialContent: `
      <p>[Your Name]  
      [Your Position]  
      [Company Name]  
      [Company Address]  
      [City, State ZIP Code]</p>

      <p>[Date]</p>

      <p>[Recipient's Name]  
      [Recipient's Position]  
      [Recipient's Company]  
      [Recipient's Address]</p>

      <p>Dear [Recipient's Name],</p>

      <p>I am writing to [state the purpose of the letter clearly—e.g., follow up on a meeting, request information, express a concern].</p>

      <p>[Include supporting details or context. Be concise and professional.]</p>

      <p>Thank you for your time and attention. I look forward to your response.</p>

      <p>Sincerely,  
      [Your Full Name]</p>
    `,
  },
  {
    id: "resume",
    label: t("documents.Resume"),
    description: t("documents.Resume description"),
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Full Name]</h1>
      <p>[City, State] | [Phone Number] | [Email] | [LinkedIn/Portfolio]</p>

      <h2>Professional Summary</h2>
      <p>Results-driven [Your Role] with X years of experience in [industry/technologies]. Proven ability to deliver high-impact solutions and manage complex projects.</p>

      <h2>Experience</h2>
      <h3>[Job Title] – [Company Name]</h3>
      <p>[Month, Year] – [Month, Year]</p>
      <ul>
        <li>Responsibility or achievement #1</li>
        <li>Responsibility or achievement #2</li>
      </ul>

      <h2>Education</h2>
      <p>[Degree], [Institution] – [Year]</p>

      <h2>Skills</h2>
      <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
      </ul>
    `,
  },
  {
    id: "cover-letter",
    label: t("documents.Cover Letter"),
    description: t("documents.Cover Letter description"),
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>[Your Name]  
      [Your Address]  
      [City, State, ZIP Code]  
      [Email Address]  
      [Phone Number]</p>

      <p>[Date]</p>

      <p>[Hiring Manager’s Name]  
      [Company Name]  
      [Company Address]</p>

      <p>Dear [Hiring Manager's Name],</p>

      <p>I am writing to express my interest in the [Job Title] position at [Company Name] as advertised. With a strong background in [relevant skills or experience], I am confident in my ability to contribute to your team’s success.</p>

      <p>[Insert a paragraph highlighting key achievements or experiences that make you a strong candidate.]</p>

      <p>Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.</p>

      <p>Sincerely,  
      [Your Full Name]</p>
    `,
  },
  {
    id: "letter",
    label: t("documents.Letter of Recommendation"),
    description: t("documents.Letter of Recommendation description"),
    imageUrl: "/letter.svg",
    initialContent: `
      <p>[Your Name]  
      [Your Address]  
      [City, State ZIP Code]</p>

      <p>[Date]</p>

      <p>Dear [Recipient’s Name],</p>

      <p>I hope this letter finds you well. I am writing to [insert purpose of the letter, e.g., share news, offer thanks, express an opinion].</p>

      <p>[Additional details or personal message]</p>

      <p>Looking forward to hearing from you soon.</p>

      <p>Warm regards,  
      [Your Name]</p>
    `,
  },
];
