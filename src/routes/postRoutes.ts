import express from "express";
import resolver from "../utils/Resolver";
import auth from "../middlewares/auth";
import CreateNewPostController from "../controllers/CreateNewPostController";
import EditPostController from "../controllers/EditPostController";
import DeletePostController from "../controllers/DeletePostController";
import ListAllPostsController from "../controllers/ListAllPostsController";
import ListPostController from "../controllers/ListPostController";
import AddPostLikeController from "../controllers/AddPostLikeController";
import DeletePostLikeController from "../controllers/DeletePostLikeController";
import AddPostCommentController from "../controllers/AddPostCommentController";
import EditPostCommentController from "../controllers/EditPostCommentController";

import DeletePostCommentController from "../controllers/DeletePostCommentController";

import IDeletePostCommentController from "../interfaces/IDeletePostCommentController";

const postRouter: express.Router = express.Router();

const createNewPostController: CreateNewPostController =
  new CreateNewPostController();

const editPostController: EditPostController = new EditPostController();

const deletePostController: DeletePostController = new DeletePostController();

const listAllPostsController: ListAllPostsController =
  new ListAllPostsController();

const listPostController: ListPostController = new ListPostController();

const addPostLikeController: AddPostLikeController =
  new AddPostLikeController();

const deletePostLikeController: DeletePostLikeController =
  new DeletePostLikeController();

const addPostCommentController: AddPostCommentController =
  new AddPostCommentController();

const editPostCommentController: EditPostCommentController =
  new EditPostCommentController();

const deletePostCommentController: IDeletePostCommentController =
  new DeletePostCommentController();

postRouter.post("/register", auth, resolver(createNewPostController.handle));

postRouter.post("/like", auth, resolver(addPostLikeController.handle));

postRouter.delete(
  "/like/delete",
  auth,
  resolver(deletePostLikeController.handle)
);

postRouter.post("/comment", auth, resolver(addPostCommentController.handle));

postRouter.put(
  "/comment/edit",
  auth,
  resolver(editPostCommentController.handle)
);

postRouter.delete(
  "/comment/delete",
  auth,
  resolver(deletePostCommentController.handle)
);

postRouter.put("/edit", auth, resolver(editPostController.handle));

postRouter.delete("/delete", auth, resolver(deletePostController.handle));

postRouter.get("/post", auth, resolver(listPostController.handle));

postRouter.get("/posts", auth, resolver(listAllPostsController.handle));

export default postRouter;
