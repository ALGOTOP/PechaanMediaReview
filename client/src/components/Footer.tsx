export default function Footer() {
  return (
    <footer className="border-t bg-card" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pehchaan Media</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-service creative agency crafting stories that connect, inspire, and move audiences globally.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>infopehchaanmedia@gmail.com</li>
              <li>+92 335 5312242</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pehchaan Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
