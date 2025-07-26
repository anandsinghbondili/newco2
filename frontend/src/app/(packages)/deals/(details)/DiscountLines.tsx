import { RCXSimpleGrid } from "@/components/ext/grid/RCXSimpleGrid";
import { RCXSimplePanel } from "@/components/ext/panel/RCXSimplePanel";
import React from "react";

const DiscountLines = () => {
  return (
    <>
      <RCXSimplePanel
        title="Discount Lines"
        collapsible={true}
        defaultCollapsed={false}
        onCollapseChange={() => {}}
      >
        <RCXSimpleGrid
          columns={[
            {
              header: "Discount Line",
              accessorKey: "discount_line",
            },
          ]}
          data={[]}
        />
      </RCXSimplePanel>
    </>
  );
};

export default DiscountLines;
