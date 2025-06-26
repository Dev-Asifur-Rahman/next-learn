import React from 'react';

const AdminSideBar = () => {
    return (
        <div className="drawer lg:drawer-open">
  {/* Hidden checkbox to toggle drawer on small screens */}
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

  {/* Main content */}
  <div className="drawer-content flex flex-col">
    {/* Toggle button visible only on small screens */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">
      Open drawer
    </label>

    {/* Page content here */}
    <div className="p-4">
      <h1 className="text-2xl font-bold">Main Content</h1>
      <p>This content adjusts based on screen size.</p>
    </div>
  </div>

  {/* Sidebar drawer */}
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay lg:hidden" aria-label="close sidebar"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>

    );
};

export default AdminSideBar;