import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { magicLink } from "better-auth/plugins";
import { sendEmail } from "./mail";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite",
    schema: {
      ...schema,
    },
  }),
  trustedOrigins: ["http://localhost:5173"],
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
        await sendEmail({
          from: '"PMS" <noreply@pms.com>',
          to: email,
          subject: "Sign in to Your App",
          text: `Click the link to sign in.`,
          html: `
            <div style="font-family: sans-serif;">
              <h2>Magic Link Login</h2>
              <p>Click the button below to sign in to your account.</p>
              <a href="${url}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Sign In
              </a>
              <p>If the button doesn't work, copy and paste this link: ${url}</p>
            </div>
          `,
        });
      },
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
      },
    },
  },
});
