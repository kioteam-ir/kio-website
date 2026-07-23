import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <div className="text-center pt-20 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2">
      <div className="mb-4 mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      <footer className="bg-neutral-primary-soft">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            {/* Logo */}
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex justify-center items-center gap-2">
                <img src="/logo.png" className="h-20 w-20" alt="Kio Logo" />
                <span className="text-heading text-2xl font-semibold whitespace-nowrap">
                  Kio
                </span>
              </a>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:gap-10">
              {/* Social */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  شبکه‌های اجتماعی
                </h2>

                <ul className="text-body font-medium space-y-4">
                  <li>
                    <a
                      href="https://github.com/ashrafi-frontDeveloper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      گیت‌هاب
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://t.me/YourTelegramID"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      تلگرام
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://instagram.com/YourInstagramID"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      اینستاگرام
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                  قوانین
                </h2>

                <ul className="text-body font-medium space-y-4">
                  <li>
                    <a href="#" className="hover:underline">
                      حریم خصوصی
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:underline">
                      شرایط و قوانین استفاده
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-4 mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-body sm:text-center">
              © ۲۰۲۵ Kio. تمامی حقوق محفوظ است.
            </span>

            <div className="flex justify-center mt-4 sm:mt-0 gap-5">
              <a
                href="https://github.com/ashrafi-frontDeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-heading"
              >
                <GitHubIcon fontSize="small" />
              </a>

              <a
                href="https://t.me/YourTelegramID"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-heading"
              >
                <TelegramIcon fontSize="small" />
              </a>

              <a
                href="https://instagram.com/YourInstagramID"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-heading"
              >
                <InstagramIcon fontSize="small" />
              </a>

              <a
                href="mailto:yourmail@gmail.com"
                className="text-body hover:text-heading"
              >
                <EmailIcon fontSize="small" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
