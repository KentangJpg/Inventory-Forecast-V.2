import React from "react";

const AuthHeader = ({ label, title }) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default AuthHeader;
