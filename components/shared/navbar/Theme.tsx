"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "../../../constants";
import { useTheme } from "../../../context/ThemeProvider";
const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className="focus:bg-neutral-50 
        data-[state=open]:bg-zinc-100 
        dark:focus:bg-gray-200
        dark:data-[state=open]:bg-gray-200"
        >
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent
          className="absolute -right-12 mt-3 min-w-[120px]
        rounded border bg-slate-100 py-2 dark:border-gray-400 dark:bg-gray-300"
        >
          {themes.map(({ value, label, icon }) => (
            <MenubarItem
              key={value}
              className=" flex items-center gap-4 px-2.5 py-2 dark:focus:bg-gray-400"
              onClick={() => {
                setMode(value);

                if (value !== "system") {
                  localStorage.setItem("theme", value);
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={icon}
                alt="image"
                width={20}
                height={20}
                className={`${mode === value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-zinc-500 ${mode === value ? "text-zinc-500" : "text-dark100_light900"}`}
              >
                {label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
