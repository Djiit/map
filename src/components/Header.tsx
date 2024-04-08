"use client";

import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Map</a>
      </div>
      <div className="navbar-end">
        <div className="badge badge-warning gap-2">BETA</div>
        <button className="btn btn-circle">
          <a
            className="link link-hover"
            onClick={() =>
              (document.getElementById("modal_info") as any)?.showModal()
            }
          >
            <QuestionMarkCircleIcon className="h-8 w-8" />
          </a>
        </button>
        <button className="btn btn-circle">
          <a
            className="link link-hover"
            onClick={() =>
              (document.getElementById("modal_settings") as any)?.showModal()
            }
          >
            <Cog6ToothIcon className="h-8 w-8" />
          </a>
        </button>
      </div>
      <dialog id="modal_info" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg">{t("about.title")}</h3>
          <p
            className="py-4 text-left font-normal"
            dangerouslySetInnerHTML={{ __html: t.raw("about.content") }}
          ></p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">{t("common.close")}</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog
        id="modal_settings"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg">{t("settings.title")}</h3>
          <h4 className="text-left">{t("settings.language.title")}</h4>
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
    </div>
  );
}
