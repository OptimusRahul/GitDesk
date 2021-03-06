import { shell } from 'electron';
import { clientConfiguration,  } from '../config/config';
import { responseObj } from '../utility/responseObject';
import { openVSCode } from '../controller/vscodeController';

export const checkEvent = (mainWindow, event, args) => {
    switch(args.action){
        case clientConfiguration.browserEvent:
            shell.openExternal(args.url);
            event.sender.send(
                `${clientConfiguration.browserEventReply}`, 
                responseObj(200, 'success', 'Browser Action Successful')
            );
            break;
        case clientConfiguration.editorEvent:
            console.log('editor');
            openVSCode(args.repoURL);
            break;
        default:
            event.sender.send(
                `${clientConfiguration.invalidClientEvent}`, 
                responseObj(404, 'fail', 'Invalid Action')
            );
    }
};