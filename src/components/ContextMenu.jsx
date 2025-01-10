import React from 'react'

const ContextMenu = ({ menuActions, menuPosition, hideMenu }) => (
    <div className="absolute border-2 border-slate-300 bg-white p-2 shadow-lg" style={menuPosition}>
        {Object.entries(menuActions).map(([actionName, actionCallback]) => (
            <div className="cursor-pointer px-1.5 pr-8 hover:bg-slate-200" key={actionName} onClick={() => { actionCallback(); hideMenu(); }}>{actionName}</div>
        ))}
    </div>
)

export default ContextMenu;