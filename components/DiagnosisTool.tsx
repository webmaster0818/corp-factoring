"use client";

import { useState } from "react";
import { FactoringCompany, factoringCompanies } from "@/data/companies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Question = {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    nextQuestion?: string;
  }[];
};

const questions: Question[] = [
  {
    id: "amount",
    question: "売掛金の金額はどのくらいですか？",
    options: [
      { label: "100万円未満", value: "small", nextQuestion: "business-type" },
      { label: "100万円〜500万円", value: "medium", nextQuestion: "priority" },
      { label: "500万円以上", value: "large", nextQuestion: "priority" },
    ],
  },
  {
    id: "business-type",
    question: "事業形態を教えてください",
    options: [
      { label: "法人（株式会社・合同会社など）", value: "corporation", nextQuestion: "priority" },
      { label: "個人事業主・フリーランス", value: "individual", nextQuestion: "priority" },
    ],
  },
  {
    id: "priority",
    question: "最も重視するポイントは何ですか？",
    options: [
      { label: "手数料の安さ", value: "fee", nextQuestion: "urgency" },
      { label: "入金スピード", value: "speed", nextQuestion: "urgency" },
      { label: "審査の通りやすさ", value: "approval", nextQuestion: "urgency" },
    ],
  },
  {
    id: "urgency",
    question: "いつまでに資金が必要ですか？",
    options: [
      { label: "今日中（即日）", value: "today" },
      { label: "2〜3日以内", value: "few-days" },
      { label: "1週間程度", value: "week" },
    ],
  },
];

export function DiagnosisTool() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("amount");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FactoringCompany[] | null>(null);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleAnswer = (value: string, nextQuestion?: string) => {
    const newAnswers = { ...answers, [currentQuestionId]: value };
    setAnswers(newAnswers);

    if (nextQuestion) {
      setCurrentQuestionId(nextQuestion);
    } else {
      // 診断完了 - 結果を計算
      const recommendations = calculateRecommendations(newAnswers);
      setResult(recommendations);
    }
  };

  const calculateRecommendations = (answers: Record<string, string>): FactoringCompany[] => {
    let filtered = [...factoringCompanies];

    // 金額で絞り込み
    if (answers.amount === "small") {
      filtered = filtered.filter((c) => c.minAmount <= 100000);
    }

    // 事業形態で絞り込み
    if (answers["business-type"] === "individual") {
      filtered = filtered.filter((c) => c.personalSupport);
    }

    // 優先度でソート
    if (answers.priority === "fee") {
      filtered.sort((a, b) => a.fees.min - b.fees.min);
    } else if (answers.priority === "speed") {
      filtered.sort((a, b) => {
        const aSpeed = a.speed.includes("30分") ? 0 : a.speed.includes("2時間") ? 1 : 2;
        const bSpeed = b.speed.includes("30分") ? 0 : b.speed.includes("2時間") ? 1 : 2;
        return aSpeed - bSpeed;
      });
    } else if (answers.priority === "approval") {
      filtered = filtered.filter((c) => c.category.includes("審査甘い"));
    }

    // 緊急度で絞り込み
    if (answers.urgency === "today") {
      filtered = filtered.filter((c) => c.category.includes("即日"));
    }

    return filtered.slice(0, 3);
  };

  const reset = () => {
    setCurrentQuestionId("amount");
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">🎯 診断結果</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              あなたにおすすめのファクタリング会社
            </p>
            <p className="text-sm text-gray-600">
              以下の3社があなたの条件に最適です
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {result.map((company, index) => (
              <div
                key={company.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl mb-2">{company.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{company.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-3 mb-3">
                      <div className="bg-blue-50 p-3 rounded">
                        <div className="text-xs text-gray-600 mb-1">手数料</div>
                        <div className="font-bold text-blue-700">
                          {company.fees.min}%〜{company.fees.max}%
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <div className="text-xs text-gray-600 mb-1">入金スピード</div>
                        <div className="font-bold text-green-700">⚡{company.speed}</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <div className="text-xs text-gray-600 mb-1">評価</div>
                        <div className="font-bold text-purple-700">
                          ⭐{company.rating} ({company.reviewCount}件)
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {company.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full md:w-auto">
                      {company.name}の詳細を見る →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={reset}>
              もう一度診断する
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const progress = ((Object.keys(answers).length + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          🧮 最適なファクタリング会社診断
        </CardTitle>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            質問 {Object.keys(answers).length + 1} / {questions.length}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentQuestion.question}
          </h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto py-4 text-left justify-start text-base hover:bg-blue-50 hover:border-blue-500 transition-all"
                onClick={() => handleAnswer(option.value, option.nextQuestion)}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {Object.keys(answers).length > 0 && (
          <div className="text-center">
            <Button variant="ghost" onClick={reset} className="text-sm">
              最初からやり直す
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
