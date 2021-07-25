// 01 - Import of Modules and Authentication

import fetch from 'node-fetch';
const key = "90c8092377a190742c004384e0fef4d6";
const token = "e7541d160e329f1101bceadbbb68500cad709a2f387b1084ff21159c975b8840";

// 02 - PUT requests

function moveCardToList(idCard, idListTarget, idBoardTarget, position) {
  try {
    fetch(`https://api.trello.com/1/cards/${idCard}?key=${key}&token=${token}&idList=${idListTarget}&idBoard=${idBoardTarget}&pos=${position}`, {
      method: 'PUT'
    });
  } catch (e) {
    console.log(e);
  }
}

// 03 - GET requests

async function getCardsOnList(idList, exceptionList) {
  try {
    const response = await fetch(`https://api.trello.com/1/lists/${idList}/cards?key=${key}&token=${token}`, {
      method: 'GET'
    });
    const cardData = await response.json();

    var idCard = [];
    for (var i = 0; i < cardData.length; i++) {

      if (!exceptionList.includes(cardData[i]["id"]))

        idCard.push(cardData[i]["id"]);
    }
    return idCard;
  } catch (e) {
    console.log(e);
  }
}

async function getChecklistsOnCard(idCard) {
  try {
    const response = await fetch(`https://api.trello.com/1/cards/${idCard}/checklists?key=${key}&token=${token}`, {
      method: 'GET'
    });

    return response.json();
  } catch (e) {
    console.log(e);
  }
}

// 04 - POST Requests

function copyChecklistToCard(idCard, idChecklistSource) {
  try {
    fetch(`https://api.trello.com/1/card/${idCard}/checklists?key=${key}&token=${token}&idChecklistSource=${idChecklistSource}`, {
      method: 'POST'
    });
  } catch (e) {
    console.log(e);
  }
}

// 05 - Fundamental Custom Functions

export async function sendToList(idListSource, idListTarget, idBoardTarget, exceptionList, position) {
  let idCard = await getCardsOnList(idListSource, exceptionList);
  let a = idCard.length;
  console.log(idCard)
  for (var i = a - 1; i >= 0; i--) {
    moveCardToList(idCard[i], idListTarget, idBoardTarget, position);
  }
}

export async function addChecklist(idListTarget, idChecklistSource, exceptionList) {

  let idCard = await getCardsOnList(idListTarget, exceptionList);
  let a = idCard.length;
  console.log(idCard)
  for (var i = 0; i < a; i++) {
    var j = await getChecklistsOnCard(idCard[i]);
    if (j.length === 0) {
      copyChecklistToCard(idCard[i], idChecklistSource);
    }
  }
}

// const sendToListData = sendToList();
// const addChecklistData = addChecklist();

// sendToListData.then(res => console.log(res));
// addChecklistData.then(res => console.log(res));