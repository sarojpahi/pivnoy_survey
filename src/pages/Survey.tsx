import { useState } from "react";
import Template1 from "../components/Survery/Template1";
import Button from "../components/PrimaryButton";
import Form1 from "../components/Survery/Form1";

const Survey: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const templates = [
    { name: "Template 1", title: "Title 1", count: 3, interval: 7, delay: 2 },
    { name: "Template 2", title: "Title 2", count: 2, interval: 10, delay: 3 },
  ];
  const selectTemplate = (templateName: string) => {
    setSelectedTemplate(templateName);
  };
  const useTemplate = () => {
    setIsCustomizing(true);
  };
  return (
    <div>
      <div className="text-2xl font-semibold text-black-100 mb-4">
        Create Survey
      </div>
      <div className=" mb-4 flex gap-10">
        <div className="w-1/2 ">
          <div className="text-xl text-black-100 mb-2 flex justify-between">
            {isCustomizing ? "Customize Survey" : "Select Template"}
            {isCustomizing ? (
              <Button onClick={() => setIsCustomizing(false)}>
                Select Template
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            {!isCustomizing && (
              <ul>
                {templates.map((template) => (
                  <li
                    key={template.name}
                    onClick={() => selectTemplate(template.name)}
                    className={`cursor-pointer p-4 bg-white shadow-md rounded-lg my-4 ${
                      selectedTemplate === template.name
                        ? "border border-blue-500"
                        : ""
                    } transition duration-300 ease-in-out`}
                  >
                    {template.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedTemplate && !isCustomizing && (
              <div className="flex justify-end">
                <Button onClick={useTemplate}>Use Template</Button>
              </div>
            )}
            {isCustomizing && (
              <div>
                {selectedTemplate === "Template 1" ? (
                  <div>
                    <Form1 />
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 ">
          <div className="text-xl text-black-100 mb-2">
            Your Survey look like this :
          </div>
          <div>{selectedTemplate === "Template 1" && <Template1 />}</div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
