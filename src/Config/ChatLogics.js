export const getSenderName = (loggedUser, users) => {
  return users[0]._id === loggedUser.data._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser.data._id ? users[1] : users[0];
};

export const isSameSenderMargin = (messages, i, index, userId) => {
  //creating margin
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === i.sender._id &&
    messages[index].sender._id !== userId
  )
    return 10;
  else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== i.sender._id &&
      messages[index].sender._id !== userId) ||
    (index === messages.length - 1 && messages[index].sender._id !== userId)
  )
    return 10;
  else return "auto";
};
export const isSameUser = (messages, i, index) => {
  return index > 0 && messages[index - 1].sender._id === i.sender._id;
};
