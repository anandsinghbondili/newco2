// Simple Examples for Each Layout 

"use client";

export default function UnderProgressPage() {
    return (
        // 1. Auto Layout
        // <div className="space-x-4">
        //     <div className="bg-blue-100 p-2">Auto-sized</div>
        //     <div className="bg-green-100 p-4">Another box</div>
        // </div>

        // 2. Fit Layout
        // <div className="flex flex-col h-screen">
        //     <div className="flex-1 bg-blue-900 p-4">
        //     </div>
        // </div>

        // 3. Card Layout
        // <div className="relative h-64">
        //     <div className="absolute inset-0 bg-red-100 hidden" id="card1">Card 1</div>
        //     <div className="absolute inset-0 bg-green-100 hidden" id="card2">Card 2</div>
        //     <div className="absolute inset-0 bg-blue-100 block" id="activeCard">Active Card</div>
        // </div>

        // 4. Border Layout
        // <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[200px_1fr_200px] h-screen">
        //     <div className="row-span-1 col-span-3 bg-gray-200">North</div>
        //     <div className="row-span-1 col-span-1 bg-gray-300">West</div>
        //     <div className="row-span-1 col-span-1 bg-white">Center</div>
        //     <div className="row-span-1 col-span-1 bg-gray-300">East</div>
        //     <div className="row-span-1 col-span-3 bg-gray-200">South</div>
        // </div>

        // 5. Accordion Layout
        // <div className="flex flex-col divide-y w-64 border">
        //     <div className="p-2">Panel 1</div>
        //     <div className="p-2">Panel 2 (expanded)</div>
        //     <div className="p-2 hidden">Content inside Panel 2</div>
        //     <div className="p-2">Panel 3</div>
        // </div>

        // 6. HBox Layout
        // <div className="flex items-center justify-center gap-4">
        //     <div className="bg-blue-100 p-4">Box 1</div>
        //     <div className="bg-green-100 p-4 flex-1">Box 2 (flex: 1)</div>
        // </div>

        // 7. VBox Layout
        // <div className="flex flex-col justify-start items-stretch h-64 gap-3">
        //     <div className="bg-blue-100 p-2">Top</div>
        //     <div className="bg-green-100 p-2 flex-1">Middle Stretch</div>
        //     <div className="bg-red-100 p-2">Bottom</div>
        // </div>

        // 8. Table Layout
        // <div className="grid grid-cols-3 gap-2">
        //     <div className="bg-gray-100 p-2">Row 1, Col 1</div>
        //     <div className="bg-gray-200 p-2 col-span-2">Row 1, Col 2-3</div>
        //     <div className="bg-gray-100 p-2">Row 2, Col 1</div>
        //     <div className="bg-gray-100 p-2">Row 2, Col 2</div>
        //     <div className="bg-gray-100 p-2">Row 2, Col 3</div>
        // </div>

        // 9. Anchor Layout
        // <div className="relative h-64">
        //     <div className="absolute top-1/2 left-1/2 w-1/2 h-1/4 bg-blue-200 transform -translate-x-1/2 -translate-y-1/2">
        //         Anchored Box (50% x, 25% y)
        //     </div>
        // </div>

        // 10. Absolute Layout
        // <div className="relative h-64">
        //     <div className="absolute top-10 left-20 bg-yellow-100 p-2">Positioned Box</div>
        // </div>

        // 11. Column Layout
        // type - 1
        // <div className="columns-2 gap-4">
        //     <p className="break-inside-avoid bg-amber-300">Column 1 content</p>
        //     <p className="break-inside-avoid bg-blue-500">Column 2 content</p>
        // </div>

        // type -2
        // <div className="grid grid-cols-3 gap-4">
        //     <div className="col-span-1 bg-blue-500">Col 1</div>
        //     <div className="col-span-1 bg-green-400">Col 2</div>
        //     <div className="col-span-1 bg-red-400">Col 3</div>
        // </div>

        // 12. Form Layout
        <form className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className="border p-1" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="border p-1" />
        </form>

    );
}
