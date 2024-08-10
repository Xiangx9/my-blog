import { request } from "@/api/axios";

export const getPostsDetails = (id) => { // 获取帖子详情
  return request(`/api/posts/getPostsDetails/${id}`,{}, "get")
}

export const getComments = (postId) => { // 获取评论
  return request(`/api/comments/${postId}`,{}, "get")
}

export const addComment = (prams) => { // 添加评论
  return request(`/api/comments/`,prams, "post")
}