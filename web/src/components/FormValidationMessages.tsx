import React from "react";

interface Props {
  errors: string[];
}

export const FormValidationMessages: React.FC<Props> = ({ errors }) => {
  return (
    <>
      {!!errors.length && (
        <ul className="p-5 bg-gray-200">
          {errors.map((err) => (
            <>
              <li key={err} className="text-gray-800 ">
                <i className="text-2xl text-red-500">&bull; </i>
                {err}
              </li>
            </>
          ))}
        </ul>
      )}
    </>
  );
};
