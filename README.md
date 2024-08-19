![Status](https://img.shields.io/badge/status-in_development-orange)

## Project Description

The AWS Route 53 Manager Web UI is a user-friendly interface designed to simplify the management of AWS Route 53 DNS services. It offers a streamlined web-based platform where users can perform all essential Route 53 operations without diving deep into the AWS Console. The solution is composed of a frontend built using modern web technologies and a backend API that serves as a wrapper over the AWS SDK, enabling seamless interaction with Route 53 resources.

### Key Features

- **Hosted Zone Management**: Create, update, and delete hosted zones with ease.
- **DNS Record Management**: Add, modify, and delete DNS records for your domains.
- **User-Friendly Interface**: Intuitive UI that abstracts the complexities of AWS operations.
- **Integrated API Layer**: The backend API handles all AWS Route 53 requests, providing a smooth experience for the user.
- **Security**: User can put their AWS API keys into our Web UI and per user session it's API Keys will be used to manage their Route 53 services. Also we have strict policies where we don't store any user information (api keys included) in a session.

<!--
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->

## Tech Stack

- **Frontend**:

  - Framework: Next.js (React)
  - UI: TailwindCSS, ShadCN UI
  - Learn more about ShadCN UI https://ui.shadcn.com/docs/installation

###

- **Backend**:
  - Runtime: Node.js
  - Framework: Express.js
  - AWS Integration: AWS SDK for JavaScript

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
