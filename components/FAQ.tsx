"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "ファクタリングとは何ですか？",
    answer: "ファクタリングとは、企業が保有する売掛金（請求書）をファクタリング会社に売却し、支払期日より前に現金化する資金調達方法です。銀行融資と異なり、負債にならず、最短即日で資金調達が可能です。"
  },
  {
    question: "2社間ファクタリングと3社間ファクタリングの違いは？",
    answer: "2社間ファクタリングは、利用者とファクタリング会社の2社間で契約し、売掛先に知られずに資金調達できます。手数料は10〜30%程度。3社間ファクタリングは、売掛先の同意を得て3社間で契約し、手数料は1〜10%程度と安くなりますが、売掛先に知られます。"
  },
  {
    question: "手数料の相場はどのくらいですか？",
    answer: "2社間ファクタリングの手数料相場は10〜30%、平均15%程度です。3社間ファクタリングは1〜10%、平均5%程度です。最近はオンライン完結型のサービスで1%〜の低手数料も登場しています。"
  },
  {
    question: "審査基準は何ですか？",
    answer: "ファクタリングの審査で最も重視されるのは「売掛先の信用力」です。利用者自身の経営状態よりも、売掛金を支払う取引先の信用度が重要です。そのため、赤字決算や税金滞納があっても、売掛先が信頼できる企業であれば審査に通る可能性があります。"
  },
  {
    question: "個人事業主でも利用できますか？",
    answer: "はい、個人事業主・フリーランスでも利用できるファクタリング会社が増えています。ペイトナー、ラボル、ベストファクター、FREENANCEなどが個人事業主に対応しています。1万円から少額対応している会社もあります。"
  }
];

export function FAQ() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          よくある質問（FAQ）
        </h2>
        <p className="text-gray-600">
          ファクタリングに関するよくある質問をまとめました
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold">
              Q{index + 1}. {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          ※ この FAQはモックアップです（5項目のみ表示）
        </p>
      </div>
    </div>
  );
}
