import { useState } from "react";
import ContextMenu from "../components/ContextMenu";

export const useContextMenu = () => {
    const [menuState, setMenuState] = useState({ 
        menuIsOpen: false,
        menuPosition: { top: 0, left: 0 },
        menuActions: {}
    });

    const showMenu = (event, menuActions) => {
        event.preventDefault();
        event.stopPropagation();
        setMenuState({
            menuIsOpen: true,
            menuPosition: { top: event.clientY, left: event.clientX },
            menuActions
        });
    }

    const hideMenu = () => {
        if(menuState.menuIsOpen){
            setMenuState((prevState) => ({ ...prevState, menuIsOpen: false }));
        }
    }

    const contextMenu = (menuState.menuIsOpen) && <ContextMenu menuActions={menuState.menuActions} menuPosition={menuState.menuPosition} hideMenu={hideMenu} />

    return [contextMenu, showMenu, hideMenu];
}