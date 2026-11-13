import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItemData[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_18px_42px_-26px_oklch(40%_0.08_260/0.18)]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const triggerId = `faq-trigger-${item.id}`;

        return (
          <div
            key={item.id}
            className={`transition-colors duration-200 ${
              isOpen ? "bg-[oklch(97%_0.018_252)]" : "bg-white hover:bg-[oklch(98.5%_0.008_252)]"
            }`}
          >
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--ring)] cursor-pointer sm:px-6 sm:text-[15px] ${
                  isOpen
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)] hover:text-[var(--primary)]"
                }`}
              >
                <span>{item.question}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isOpen
                      ? "bg-[var(--primary)]/12 text-[var(--primary)]"
                      : "bg-[oklch(95.5%_0.02_252)] text-[var(--muted-foreground)]"
                  }`}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? "rotate-180 text-[var(--primary)]" : ""
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 pr-12 text-sm leading-relaxed text-[var(--muted-foreground)] sm:px-6">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
