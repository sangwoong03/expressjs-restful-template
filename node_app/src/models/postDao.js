const BaseError = require("../middlewares/baseError")
const dataSource = require("./dataSource")

const getPostByUserId
const getPostByPostId

const getAllPosts = async () => {
  try {
    return await dataSource.query(
      `
        SELECT
          p.id as postId,
          p.title as postTitle,
          p.content as postContent,
          p.image_url as postImageUrl,
          u.id as userId,
          u.email as userEmail,
          u.profile_img_url as userImage
        FROM posts p
        JOIN users u ON u.id = user_id
      `
    )
  }
}

const addPost = async (title, content, userId, image_url) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO
          posts (
            title,
            content,
            user_id,
            image_url     
          )
        VALUE (?,?,?,?)
      `, [title, content, userId, image_url]
    )
  }
}