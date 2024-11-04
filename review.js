const data = {
  currentUser: {
    image: {
      png: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
      webp: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
    },
    username: "juliusomo",
  },
  comments: [
    {
      parent: 0,
      id: 1,
      content:
        "Wah, layanan jaringan dan keamanan siber dari kamu bener-bener top! Rasanya seperti punya bodyguard digital yang siap ngelindungin data saya. Nggak cuma aman, tapi juga bikin tenang. Sekarang saya bisa tidur nyenyak tanpa khawatir ada hacker yang nyusup! 😂👍 Terima kasih, jadi pengen investasi di keamanan siber terus deh!",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
          webp: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
        },
        username: "mas amba",
      },
      replies: [],
    },
    {
      parent: 0,
      id: 2,
      content:
        "Hey, aku baru denger tentang CTF dan langsung penasaran! 🤔 Bisa ajarin aku nggak? Kayak mana sih caranya supaya bisa mengalahkan tantangan-tantangan itu? Nggak sabar pengen belajar hacking yang aman dan seru! 😄 Siapa tahu bisa jadi 'pahlawan siber' juga, kan? 🔐✨",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
          webp: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
        },
        username: "kurumi",
      },
      replies: [
        {
          parent: 2,
          id: 1,
          content:
            "Wah, mantap! CTF itu kayak permainan puzzle yang seru! Kita bisa belajar bareng dan aku bakal kasih tips-tipsnya. Siap-siap ketagihan, ya! 🔍🕵️‍♂️",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "kurumi",
          user: {
            image: {
              png: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
              webp: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
            },
            username: "indianajohn",
          },
        },
        {
          parent: 2,
          id: 1,
          content:
            "Gas! 🔥 Siap-siap kita hajar Gemastik bareng! Bawa semangat dan camilan, karena kita bakal ngulik banyak tantangan seru! 💪😄",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "indianajohn",
          user: {
            image: {
              png: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
              webp: "./gambar/foto-profil-whatsapp-kosong-kacamata.jpg",
            },
            username: "Makarov",
          },
        },
      ],
    },
  ],
};

function appendFrag(frag, parent) {
  var children = [].slice.call(frag.childNodes, 0);
  parent.appendChild(frag);
  return children[1];
}

const addComment = (body, parentId, replyTo = undefined) => {
  let commentParent =
    parentId === 0
      ? data.comments
      : data.comments.filter((c) => c.id == parentId)[0].replies;
  let newComment = {
    parent: parentId,
    id:
      commentParent.length == 0
        ? 1
        : commentParent[commentParent.length - 1].id + 1,
    content: body,
    createdAt: "Now",
    replyingTo: replyTo,
    score: 0,
    replies: parent == 0 ? [] : undefined,
    user: data.currentUser,
  };
  commentParent.push(newComment);
  initComments();
};
const deleteComment = (commentObject) => {
  if (commentObject.parent == 0) {
    data.comments = data.comments.filter((e) => e != commentObject);
  } else {
    data.comments.filter((e) => e.id === commentObject.parent)[0].replies =
      data.comments
        .filter((e) => e.id === commentObject.parent)[0]
        .replies.filter((e) => e != commentObject);
  }
  initComments();
};

const promptDel = (commentObject) => {
  const modalWrp = document.querySelector(".modal-wrp");
  modalWrp.classList.remove("invisible");
  modalWrp.querySelector(".yes").addEventListener("click", () => {
    deleteComment(commentObject);
    modalWrp.classList.add("invisible");
  });
  modalWrp.querySelector(".no").addEventListener("click", () => {
    modalWrp.classList.add("invisible");
  });
};

const spawnReplyInput = (parent, parentId, replyTo = undefined) => {
  if (parent.querySelectorAll(".reply-input")) {
    parent.querySelectorAll(".reply-input").forEach((e) => {
      e.remove();
    });
  }
  const inputTemplate = document.querySelector(".reply-input-template");
  const inputNode = inputTemplate.content.cloneNode(true);
  const addedInput = appendFrag(inputNode, parent);
  addedInput.querySelector(".bu-primary").addEventListener("click", () => {
    let commentBody = addedInput.querySelector(".cmnt-input").value;
    if (commentBody.length == 0) return;
    addComment(commentBody, parentId, replyTo);
  });
};

const createCommentNode = (commentObject) => {
  const commentTemplate = document.querySelector(".comment-template");
  var commentNode = commentTemplate.content.cloneNode(true);
  commentNode.querySelector(".usr-name").textContent =
    commentObject.user.username;
  commentNode.querySelector(".usr-img").src = commentObject.user.image.webp;
  commentNode.querySelector(".score-number").textContent = commentObject.score;
  commentNode.querySelector(".cmnt-at").textContent = commentObject.createdAt;
  commentNode.querySelector(".c-body").textContent = commentObject.content;
  if (commentObject.replyingTo)
    commentNode.querySelector(".reply-to").textContent =
      "@" + commentObject.replyingTo;

  commentNode.querySelector(".score-plus").addEventListener("click", () => {
    commentObject.score++;
    initComments();
  });

  commentNode.querySelector(".score-minus").addEventListener("click", () => {
    commentObject.score--;
    if (commentObject.score < 0) commentObject.score = 0;
    initComments();
  });
  if (commentObject.user.username == data.currentUser.username) {
    commentNode.querySelector(".comment").classList.add("this-user");
    commentNode.querySelector(".delete").addEventListener("click", () => {
      promptDel(commentObject);
    });
    commentNode.querySelector(".edit").addEventListener("click", (e) => {
      const path = e.path[3].querySelector(".c-body");
      if (
        path.getAttribute("contenteditable") == false ||
        path.getAttribute("contenteditable") == null
      ) {
        path.setAttribute("contenteditable", true);
        path.focus()
      } else {
        path.removeAttribute("contenteditable");
      }
      
    });
    return commentNode;
  }
  return commentNode;
};

const appendComment = (parentNode, commentNode, parentId) => {
  const bu_reply = commentNode.querySelector(".reply");
  // parentNode.appendChild(commentNode);
  const appendedCmnt = appendFrag(commentNode, parentNode);
  const replyTo = appendedCmnt.querySelector(".usr-name").textContent;
  bu_reply.addEventListener("click", () => {
    if (parentNode.classList.contains("replies")) {
      spawnReplyInput(parentNode, parentId, replyTo);
    } else {
      //console.log(appendedCmnt.querySelector(".replies"));
      spawnReplyInput(
        appendedCmnt.querySelector(".replies"),
        parentId,
        replyTo
      );
    }
  });
};

function initComments(
  commentList = data.comments,
  parent = document.querySelector(".comments-wrp")
) {
  parent.innerHTML = "";
  commentList.forEach((element) => {
    var parentId = element.parent == 0 ? element.id : element.parent;
    const comment_node = createCommentNode(element);
    if (element.replies && element.replies.length > 0) {
      initComments(element.replies, comment_node.querySelector(".replies"));
    }
    appendComment(parent, comment_node, parentId);
  });
}

initComments();
const cmntInput = document.querySelector(".reply-input");
cmntInput.querySelector(".bu-primary").addEventListener("click", () => {
  let commentBody = cmntInput.querySelector(".cmnt-input").value;
  if (commentBody.length == 0) return;
  addComment(commentBody, 0);
  cmntInput.querySelector(".cmnt-input").value = "";
});