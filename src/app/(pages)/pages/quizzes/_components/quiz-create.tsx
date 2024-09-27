"use client";
import CreateQuiz from "@/components/forms/add-quiz";
import { GlassModal } from "@/components/global/glass-modal";
import { Card, CardContent } from "@/components/ui/card";
import { BadgePlus } from "lucide-react";

const QuizCreate = () => {
  return (
    <GlassModal
    className="max-w-4xl"
      title="Create a new interactive quiz"
      description="Add a new form for your community"
      trigger={
        <span>
          <Card className="bg-[#101011] border-themeGray hover:bg-themeBlack transition duration-100 cursor-pointer border-dashed aspect-square rounded-xl">
            <CardContent className="opacity-20 flex gap-x-2 p-0 justify-center items-center h-full">
              <BadgePlus />
              <p>Create New Quiz</p>
            </CardContent>
          </Card>
        </span>
      }
    >
      <CreateQuiz />
    </GlassModal>
  );
};

export default QuizCreate;
