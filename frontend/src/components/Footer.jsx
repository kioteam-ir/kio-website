import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <>
      <div className='pt-20 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto sm:px-0 px-2'>
      <div className="mb-4 mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <footer className="bg-neutral-primary-soft">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                  <div className="mb-6 md:mb-0">
                      <a href="#" className="flex items-center">
                          <img src="/logo.png" className="h-20 w-20" alt="FlowBite Logo" />
                          <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">Kio</span>
                      </a>
                  </div>
                  <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                      <div>
                          <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Follow us</h2>
                          <ul className="text-body font-medium">
                              <li className="mb-4">
                                  <a href="https://github.com/ashrafi-frontDeveloper" className="hover:underline ">Github</a>
                              </li>
                              <li>
                                  <a href="#" className="hover:underline">Discord</a>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
                          <ul className="text-body font-medium">
                              <li className="mb-4">
                                  <a href="#" className="hover:underline">Privacy Policy</a>
                              </li>
                              <li>
                                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="mb-4 mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              <div className="sm:flex sm:items-center sm:justify-between">
                  <span className="text-sm text-body sm:text-center">© 2025 <a href="https://flowbite.com/" class="hover:underline">Kio™</a>. All Rights Reserved.
                  </span>

                  <div className="flex mt-4 sm:justify-center sm:mt-0">
                    {/* GitHub */}
                    <a
                      href="https://github.com/ashrafi-frontDeveloper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body hover:text-heading ms-5"
                    >
                      <GitHubIcon fontSize="small" />
                      <span className="sr-only">GitHub account</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/YourTelegramID"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body hover:text-heading ms-5"
                    >
                      <TelegramIcon fontSize="small" />
                      <span className="sr-only">Telegram account</span>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com/YourInstagramID"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body hover:text-heading ms-5"
                    >
                      <InstagramIcon fontSize="small" />
                      <span className="sr-only">Instagram account</span>
                    </a>

                    {/* Gmail */}
                    <a
                      href="mailto:yourmail@gmail.com"
                      className="text-body hover:text-heading ms-5"
                    >
                      <EmailIcon fontSize="small" />
                      <span className="sr-only">Gmail account</span>
                    </a>
                  </div>
              </div>
            </div>
        </footer>

      </div>
    </>
  )
}