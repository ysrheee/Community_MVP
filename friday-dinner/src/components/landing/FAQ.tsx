'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/data/mockData';

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-gray-600 text-lg">
            궁금한 점이 있으신가요?
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">더 궁금한 점이 있으신가요?</p>
          <a
            href="mailto:hello@fridaydinner.kr"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            hello@fridaydinner.kr
          </a>
        </div>
      </div>
    </section>
  );
}
