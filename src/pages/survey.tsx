import { CardRadio, CardRadioOption, Layout } from "@/components";
import { Container, Flex, Heading } from "@chakra-ui/react";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import questions from "@/data/questions.json";

type SurveyFormData = {
  deviceType: string[]; // Single selection: computer, smartphone, tablet, audio, camera
  purpose: string[]; // Multiple purposes can be selected
  price: string[]; // Budget range selected
  easeOfUse: string[]; // Single selection: importance of ease of use
  physicalSize: string[]; // Single selection: preference for physical size
  batteryLife: string[]; // Single selection: preferred battery life frequency
  storageNeeds: string[]; // Multiple selections for storage needs
  durability: string[]; // Single selection: importance of durability
  cameraUse: string[]; // Single selection: frequency of camera use
  soundQuality: string[]; // Single selection: frequency of using phone for sound
  connectivity: string[]; // Single selection: frequency of internet/WiFi use
  brandPreference: string[]; // Single selection: brand preference
  supportService: string[]; // Single selection: importance of support and service
};

function generateSurveySummary(questions: any[], answers: any) {
  let summary = "";

  questions.forEach((question: any) => {
    const answerValues = answers[question.name as keyof SurveyFormData];
    const answerLabels = question.options
      .filter((option: any) => answerValues && answerValues.includes(option.value))
      .map((option: any) => option.label)
      .join(", ");

    summary += `${question.question}\nAnswer: ${answerLabels ? answerLabels : "No selection"}\n\n`;
  });

  return summary;
}
const survey = () => {
  const router = useRouter();
  const step = router.query.step;

  const { control, register, handleSubmit, watch } = useForm<SurveyFormData>();

  const onSubmit = (data: SurveyFormData) => {
    const formattedString = generateSurveySummary(questions, data);
    alert(formattedString);

    router.push("/smartphones");
  };

  const handleNext = () => {
    if (parseInt(step as string) === questions.length - 1) {
      return;
    }

    const nextStep = parseInt(step as string) + 1;
    router.push(`/survey?step=${nextStep}`);
  };

  const handleBack = () => {
    if (parseInt(step as string) === 0) {
      return;
    }

    const nextStep = parseInt(step as string) - 1;
    router.push(`/survey?step=${nextStep}`);
  };

  const isBackDisabled = parseInt(step as string) === 0;

  useEffect(() => {
    // if step is not a number, redirect to the first question
    if (isNaN(parseInt(step as string))) {
      router.push("/survey?step=0");
    }
  }, [step]);

  // console.log(questions, step);
  const currentQuestion = questions[parseInt(step as string)] as any;
  const options = currentQuestion?.options || [];
  const name = currentQuestion?.name || "";
  const hasImage = currentQuestion?.options?.[0]?.hasImage || false;

  return (
    <Layout title="Survey" className="bg-[#fbfaff]" hideFooter>
      <form
        className="overflow-y-auto border border-b border-gray-100 bg-white py-5"
        onSubmit={handleSubmit(onSubmit)}
        id="survey-form"
      >
        <Container maxW="8xl" overflowY="visible">
          <Flex gap={5}>
            <button
              className="bg-brand-50 hover:bg-brand-100 flex h-10 w-10 items-center justify-center rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft size={20} className="text-brand-500" />
            </button>
            <div className="space-y-1">
              <Heading as="h1" className="!text-2xl !leading-[1]" fontWeight={600}>
                Survey
              </Heading>
              <p className="text-[14px] !leading-tight text-gray-500">
                Take our survey to find the best product for you.
              </p>
            </div>
          </Flex>
        </Container>
      </form>
      <Container maxW="8xl" pt={4} pb="100px">
        <div className="flex w-full justify-center space-x-4">
          {questions.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => router.push(`/survey?step=${index}`)}
                className={clsx("flex-1 rounded-lg px-4 py-1.5", {
                  "bg-brand-500 text-white": step === index.toString(),
                  "bg-gray-200 text-gray-800": step !== index.toString()
                })}
              />
            );
          })}
        </div>

        <div className="mt-10 rounded-[12px] border border-gray-200 bg-white">
          <div className="relative min-h-[200px] rounded-t-[inherit] py-5">
            <div className="bg-brand-500 absolute left-0 top-0 h-full w-full rounded-t-[12px] opacity-20" />
            <div className="h-[200px] rounded-t-[inherit] bg-[url(/images/cat-survey.png)] bg-contain bg-center bg-no-repeat" />
          </div>
          <div className="bg-brand-500 relative z-[1] mx-auto -mt-5 w-fit rounded-[100px] px-6 py-2 font-semibold text-white">
            Question {parseInt(step as string) + 1} of {questions.length}
          </div>
          <div className="rounded-b-[inherit] bg-white p-6">
            <h2 className="font-poppins text-center text-2xl font-semibold">
              {questions[parseInt(step as string)]?.question}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-4">
          {
            <Controller
              control={control}
              render={({ field: { onChange, ...props } }) => (
                <>
                  {options.map(({ value, label, icon }: any, index: number) =>
                    !hasImage ? (
                      <CardRadioOption
                        key={index}
                        // icon={label.icon}
                        onChange={(e) => {
                          const element = e.target as HTMLInputElement;

                          const { value } = element;
                          if (watch(name)?.includes(value)) {
                            onChange(watch(name)?.filter((v: any) => v !== value));
                          } else {
                            onChange([...(watch(name) || []), value]);
                          }

                          if (currentQuestion?.type === "radio") {
                            handleNext();
                          }
                        }}
                        label={label}
                        checked={watch(name)?.includes(value)}
                        value={value}
                        type={currentQuestion?.type || "radio"}
                      />
                    ) : (
                      <CardRadio
                        key={index}
                        icon={icon}
                        label={label}
                        onChange={(e) => {
                          const element = e.target as HTMLInputElement;

                          const { value } = element;
                          if (watch(name)?.includes(value)) {
                            onChange(watch(name)?.filter((v: any) => v !== value));
                          } else {
                            onChange([...(watch(name) || []), value]);
                          }

                          if (currentQuestion?.type === "radio") {
                            handleNext();
                          }
                        }}
                        checked={watch(name)?.includes(value)}
                        value={value}
                        type={currentQuestion?.type || "radio"}
                      />
                    )
                  )}
                </>
              )}
              {...{
                ...register(name),
                ref: null
              }}
            />
          }
        </div>
      </Container>
      <div className="fixed bottom-0 flex w-full justify-center space-x-4 border-t border-gray-200 bg-white py-4">
        <button
          className={clsx("rounded-lg bg-gray-100 px-6 py-2 font-medium hover:bg-gray-200", {
            "text-gray-300": isBackDisabled
          })}
          onClick={handleBack}
          disabled={isBackDisabled}
          type="button"
        >
          Back
        </button>
        <button
          className="bg-brand-400 hover:bg-brand-500 rounded-lg px-6 py-2 font-medium text-white"
          onClick={handleNext}
          type={parseInt(step as string) === questions.length - 1 ? "submit" : "button"}
          form="survey-form"
        >
          {parseInt(step as string) === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </Layout>
  );
};

export default survey;
