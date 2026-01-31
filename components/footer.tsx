// import Link from "next/link"
// import { Facebook, Instagram, Youtube } from "lucide-react"

// const footerLinks = {
//   connect: [
//     { name: "Plan Your Visit", href: "#" },
//     { name: "Contact Us", href: "#contact" },
//     // { name: "Give Online", href: "#" },
//     { name: "Prayer Request", href: "#" },
//   ],
//   about: [
//     { name: "Our Story", href: "#about" },
//     { name: "Leadership", href: "#" },
//     { name: "Beliefs", href: "#" },
//     { name: "Missions", href: "#" },
//   ],
//   ministries: [
//     { name: "Small Groups", href: "#ministries" },
//     { name: "Youth Ministry", href: "#ministries" },
//     { name: "Children's Ministry", href: "#ministries" },
//     // { name: "Worship Team", href: "#" },
//   ],
// }

// const socialLinks = [
//   { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/gpdi.cipinang" },
//   { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/gpdikarmelcipinang/" },
//   { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@gpdikarmelcipinang8403" },
// ]

// export function Footer() {
//   return (
//     <footer className="bg-foreground text-card py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
//           <div>
//             <Link href="/" className="flex items-center gap-2 mb-4">
//               <img
//                 src="/images/logo.png"
//                 alt="GPdI Karmel Logo"
//                 className="w-10 h-10 object-contain"
//               />
//               <span className="font-serif text-xl font-semibold text-card">GPdI Karmel Cipinang</span>
//             </Link>
//             <p className="text-card/70 text-sm leading-relaxed mb-6">
//               A welcoming community of faith dedicated to growing together, serving others, 
//               and sharing God&apos;s love.
//             </p>
//             <div className="flex gap-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.name}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors"
//                   aria-label={social.name}
//                 >
//                   <social.icon className="w-5 h-5 text-card" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-serif text-lg font-semibold text-card mb-4">Connect</h4>
//             <ul className="space-y-3">
//               {footerLinks.connect.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-card/70 hover:text-card transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-serif text-lg font-semibold text-card mb-4">About</h4>
//             <ul className="space-y-3">
//               {footerLinks.about.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-card/70 hover:text-card transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-serif text-lg font-semibold text-card mb-4">Ministries</h4>
//             <ul className="space-y-3">
//               {footerLinks.ministries.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-card/70 hover:text-card transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-card/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-card/60 text-sm">
//             &copy; {new Date().getFullYear()} GPdI Karmel Cipinang. All rights reserved.
//           </p>
//           <div className="flex gap-6 text-sm text-card/60">
//             <Link href="#" className="hover:text-card transition-colors">
//               Privacy Policy
//             </Link>
//             <Link href="#" className="hover:text-card transition-colors">
//               Terms of Use
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  connect: [
    { name: "Plan Your Visit", href: "#" },
    { name: "Contact Us", href: "#contact" },
    { name: "Prayer Request", href: "/?slide=1#contact" },
  ],
  about: [
    { name: "Our Story", href: "#about" },
    { name: "Leadership", href: "#" },
    { name: "Beliefs", href: "#" },
    { name: "Missions", href: "#" },
  ],
  ministries: [
    { name: "Small Groups", href: "#ministries" },
    { name: "Youth Ministry", href: "#ministries" },
    { name: "Children's Ministry", href: "#ministries" },
  ],
}

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/gpdi.cipinang",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/gpdikarmelcipinang/",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@gpdikarmelcipinang8403",
  },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-card py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* BRAND */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="GPdI Karmel Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-serif text-xl font-semibold text-card">
                GPdI Karmel Cipinang
              </span>
            </Link>

            <p className="text-card/70 text-sm leading-relaxed mb-6">
              A welcoming community of faith dedicated to growing together,
              serving others, and sharing God&apos;s love.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-card" />
                </a>
              ))}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-card mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-card/70 hover:text-card transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-card mb-4">
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-card/70 hover:text-card transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MINISTRIES */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-card mb-4">
              Ministries
            </h4>
            <ul className="space-y-3">
              {footerLinks.ministries.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-card/70 hover:text-card transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-card/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-card/60 text-sm">
            &copy; {new Date().getFullYear()} GPdI Karmel Cipinang. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-card/60">
            <Link href="#" className="hover:text-card transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-card transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
