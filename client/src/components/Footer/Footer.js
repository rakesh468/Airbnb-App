import "./Footer.css";

import React from "react";

function Footer() {
  return (
    <footer>
      <div className="seperator padded">
        <div className="col-2">
          <select className="selected">
            <option>English</option>
            <option>Espaniol</option>
            <option>French</option>
          </select>
          <select className="selected">
            <option>INR</option>
          </select>
        </div>
        <div className="content-wrap">
          <div>
            <h2>Company</h2>
            <ul className="list-layout">
              <li>
                <a href="/about" className="link-contrast">
                  About
                </a>
              </li>
              <li>
                <a href="/careers" className="link-contrast">
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="link-contrast">
                  Press
                </a>
              </li>
              <li>
                <a href="http://blog.airbnb.com" className="link-contrast">
                  Blog
                </a>
              </li>
              <li>
                <a href="/help" className="link-contrast">
                  Help
                </a>
              </li>
              <li>
                <a href="/policies" className="link-contrast">
                  Policies
                </a>
              </li>
              <li>
                <a href="/disaster-response" className="link-contrast">
                  Disaster Response
                </a>
              </li>
              <li>
                <a href="/terms" className="link-contrast">
                  Terms Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Discover</h2>
            <ul className="list-layout">
              <li>
                <a href="/trust" className="link-contrast">
                  Trust Safety
                </a>
              </li>
              <li>
                <a href="/invite?r=6" className="link-contrast">
                  Travel Credit
                </a>
              </li>
              <li>
                <a href="/gift" className="link-contrast">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="/wishlists/airbnb_picks" className="link-contrast">
                  Airbnb Picks
                </a>
              </li>
              <li>
                <a href="/mobile" className="link-contrast">
                  Mobile
                </a>
              </li>
              <li>
                <a href="/business-travel" className="link-contrast">
                  Business Travel
                </a>
              </li>
              <li>
                <a href="/sitemaps" className="link-contrast">
                  Site Map
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2>Hosting</h2>
            <ul class="list-layout">
              <li>
                <a href="/host" className="link-contrast">
                  Why Host
                </a>
              </li>
              <li>
                <a href="/hospitality" className="link-contrast">
                  Hospitality
                </a>
              </li>
              <li>
                <a href="/help/responsible-hosting" className="link-contrast">
                  Responsible Hosting
                </a>
              </li>
              <li>
                <a href="/home-safety" className="link-contrast">
                  Home Safety
                </a>
              </li>
              <li>
                <a href="/instant" className="link-contrast">
                  Instant Book
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="copyright">Airbnb footer remade by Rakesh Kumar</p>
    </footer>
  );
}

export default Footer;
