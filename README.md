# RENYU website (Next.js)

This is the RENYU marketing site, rebuilt as an owned Next.js codebase. No platform
lock-in: the code is yours, hosted wherever you like.

## Run it on your own computer (optional, to preview locally)

1. Install Node.js (https://nodejs.org, the LTS version).
2. In a terminal, from this folder:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## Put it live on the internet (free, no domain needed)

1. Make a free account at https://github.com and create a new empty repository.
2. Upload this whole folder to that repository (GitHub's web uploader works, or use git).
3. Make a free account at https://vercel.com and click "Add New Project".
4. Pick your GitHub repository. Vercel detects Next.js automatically. Click Deploy.
5. You get a free live URL like `renyu-xxxx.vercel.app`. Done.

A custom domain (e.g. yourname.com) can be added later in Vercel > Settings > Domains.
You do not need one to go live.

## Make the booking form email you

1. Free account at https://resend.com, create an API key.
2. In Vercel: Project > Settings > Environment Variables.
   Add:  RESEND_API_KEY  =  (your key)
3. Redeploy. The form at /#contact will now email hello@renyu.co.uk.
   (Until the key is set, the form shows success but does not send — fine for previewing.)
   To send from your own domain instead of the test sender, verify the domain in Resend
   and update FROM_ADDRESS in app/api/book/route.js.

## Things to swap in

- App screens: replace the placeholder files in `public/screens/` with your real PNG
  exports of the nine screens (keep the same filenames, or change them to .png and update
  the list at the top of `components/AppCarousel.jsx`).
- Logo: the "S" mark is hand-built SVG in `components/RENYULogo.jsx`. Tweak colours/shape
  there if you want it closer to the app icon.
- Fonts: headline = Poppins, body = Mulish (closest free matches). Change in
  `app/layout.jsx` if you settle on the exact licensed fonts later.
- Privacy Policy / Terms links currently point to "#". Wire them up when those pages exist.
