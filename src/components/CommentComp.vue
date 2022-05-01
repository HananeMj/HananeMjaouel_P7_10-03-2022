<template>
  <div>
    <p>
      {{ comments.length }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CommentComp",
  props: ["post"],
  data() {
    return {
      comments: [],
    };
  },
};
</script>

<style></style>
