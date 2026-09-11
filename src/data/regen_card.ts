// Regen Card Data
// https://github.com/maybeitsmark 
// 2026   

import account from '@/assets/images/RegenCard/account.png';
import card_tap_animation from '@/assets/images/RegenCard/card_tap_animation.gif';
import export_image from '@/assets/images/RegenCard/export.png';
import login from '@/assets/images/RegenCard/login.png';
import regen_card_loading_animation from '@/assets/images/RegenCard/regen_card_loading_animation.gif';
import regen_card_logo_color from '@/assets/images/RegenCard/regen_card_logo_color.png';
import regen_card_showcase from '@/assets/images/RegenCard/regen_card_showcase.png';
import request from '@/assets/images/RegenCard/request.png';
import send from '@/assets/images/RegenCard/send.png';
import transak from '@/assets/images/RegenCard/transak.png';
import verify from '@/assets/images/RegenCard/verify.png';

export const RegenCardData: any = {
  title: "Regen Card",
  description: "A USDC powered NFC payment platform designed for small businesses",
  theme: {
    background: {
      color1: "#3f7ad1",
      color2: "#2aaa25",
      intensity: 0.75,
    },
  },
  tech: "React Native, NFC, USDC, Blockchain",
  slug: "regen-card",
  thumbnail: regen_card_showcase,
  tags: ["App Development", "Visual Design", "UX Research"],
  sections: [
    {
      id: "hero-image",
      type: "image",
      src: regen_card_logo_color,
      alt: "Regen Card logo",
    },
    {
      id: "tech",
      type: "text",
      content: "Key Technology: React Native, NFC, USDC, Blockchain",
    },
    {
      id: "intro-1",
      type: "text",
      content: "Regen Card is a blockchain based payment platform that allows customers to make purchases using NFC enabled payment cards backed by USDC. The goal of the project is to provide small businesses with a low cost alternative to traditional payment processors by reducing transaction fees from the typical 3–5% down to approximately 1%, while requiring only a smartphone to accept payments.",
    },
    {
      id: "slideshow",
      type: "slideshow",
      images: [
        login,
        account,
        verify,
        send,
        request,
        export_image,
        transak,
      ],
    },
    {
      id: "solution-heading",
      type: "heading",
      content: "How it works",
    },
    {
      id: "solution-text",
      type: "text",
      content: "Customers pair their physical Regen Card with one or more blockchain accounts protected by a user defined password. Each password creates a separate account on the card, allowing multiple wallets to exist on a single NFC card. During checkout, the merchant enters the purchase amount, the customer taps their card to the merchant's phone, authenticates with their password, and the USDC payment is transferred instantly if sufficient funds are available.",
    },
    {
      id: "slideshow",
      type: "slideshow",
      images: [
        card_tap_animation,
        regen_card_loading_animation,
      ],
    },
    {
      id: "merchant-heading",
      type: "heading",
      content: "Merchant experience",
    },
    {
      id: "merchant-text",
      type: "text",
      content: "Merchants can begin accepting payments immediately by installing the mobile application. The app automatically creates a temporary USDC wallet for incoming transactions, eliminating the need for dedicated payment terminals or banking hardware. Businesses are encouraged to periodically transfer accumulated funds into their long term storage wallet at the end of each business day.",
    },
    {
      id: "security-heading",
      type: "heading",
      content: "Security",
    },
    {
      id: "security-text",
      type: "text",
      content: "User credentials are intentionally designed so they cannot be recovered by the platform. Account access requires both possession of the physical Regen Card and knowledge of the associated password, ensuring that neither passwords nor card identifiers are accessible to the company or potential attackers. This security model leverages the underlying blockchain infrastructure to minimize centralized risk.",
    },
    {
      id: "impact-heading",
      type: "heading",
      content: "Project impact",
    },
    {
      id: "impact-text",
      type: "text",
      content:
        "Regen Card demonstrates how blockchain technology can improve everyday payment experiences by reducing processing costs while maintaining familiar tap to pay interactions. By replacing traditional card networks with USDC transactions, the platform helps businesses retain more revenue while lowering the barrier to accepting digital payments.",
    },
  ],
};