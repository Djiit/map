"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { version } from "../../package.json";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      {/* <nav>
        <h6 className="footer-title">Map v{version}</h6>
        <a className="link link-hover" href="https://github.com/Djiit/map">{t("footer.sources")}</a> 
      </nav>
      <nav>
        <h6 className="footer-title">{t("footer.about")}</h6>
        <a
          className="link link-hover"
          onClick={() =>
            (document.getElementById("modal_info") as any)?.showModal()
          }
        >
          {t("footer.info")}
        </a>
        <dialog id="modal_info" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{t("footer.info")}</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">{t("common.close")}</button>
              </form>
            </div>
          </div>
        </dialog>
        <a
          className="link link-hover"
          onClick={() =>
            (document.getElementById("modal_contribute") as any)?.showModal()
          }
        >
          {t("footer.contribute")}
        </a>
        <dialog
          id="modal_contribute"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">{t("footer.contribute")}</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">{t("common.close")}</button>
              </form>
            </div>
          </div>
        </dialog>
        <a
          className="link link-hover"
          onClick={() =>
            (document.getElementById("modal_whois") as any)?.showModal()
          }
        >
          {t("footer.whois")}
        </a>
        <dialog id="modal_whois" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">{t("common.close")}</button>
              </form>
            </div>
          </div>
        </dialog>
      </nav> */}
      <nav>
        <h6 className="footer-title">{t("footer.settings")}</h6>
        <a
          className="link link-hover"
          onClick={() =>
            (document.getElementById("modal_settings") as any)?.showModal()
          }
        >
          {t("footer.language")}
        </a>
        <dialog
          id="modal_settings"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">{t("footer.language")}</h3>
            <div className="py-4 flex flex-row gap-3">
              <Link locale="en" href="/en" className="text-3xl">
                🇬🇧
              </Link>
              <Link locale="fr" href="/fr" className="text-3xl">
                🇫🇷
              </Link>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">{t("common.close")}</button>
              </form>
            </div>
          </div>
        </dialog>
      </nav>
    </footer>
  );
}
