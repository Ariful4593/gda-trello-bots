const idListSource = "60f9a70c16ebe622cebecbda";
const idChecklistSource = "60fa417519eac336d19d49db";
const exceptionList = ["60fa5f4b0d998b2545c191a1"];
const idBoardTarget = "60f9a71f32ffc354163d1463";
const idListTarget = "60f9a7267640bb5551901bb5";
const position = "bottom";

import { addChecklist, sendToList } from "./trello-bot-lib.js";

addChecklist(idListSource, idChecklistSource, exceptionList)
sendToList(idListSource, idListTarget, idBoardTarget, exceptionList, position)

