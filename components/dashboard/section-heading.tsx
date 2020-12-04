import React from "react";

export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className="mb-4 text-white text-xl font-medium">{children}</h2>;
}
