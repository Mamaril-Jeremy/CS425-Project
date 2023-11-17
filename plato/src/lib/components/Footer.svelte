<style>
    .footer-container {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #ddd;
      padding: 10px;
    }
  </style>
  
  <script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
  </script>
  
  <div class="footer-container">
    <Footer>
      <FooterCopyright href="/" by="Plato™" year={2023} />
      <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <FooterLink href="/">Licensing</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
        <FooterLink href="/">Community Guidelines</FooterLink>
      </FooterLinkGroup>
    </Footer>
  </div>
  