import React from "react";

type Props = {
  id: string;
  heading?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

const Modal = ({ id, heading, action, children }: Props) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal modal-bottom sm:modal-middle">
        <label className="modal-box" htmlFor="">
          <h3 className="font-bold text-lg">{heading}</h3>
          {children}
          {action && <div className="modal-action">{action}</div>}
        </label>
      </label>
    </>
  );
};

export default Modal;
