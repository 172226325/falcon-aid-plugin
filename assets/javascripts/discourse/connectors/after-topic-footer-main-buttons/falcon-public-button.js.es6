export default {
  actions: {
    clickButton() {
      var pathName = window.location.pathname;
      const url = this.siteSettings.falcon_aid_topic_button_url.replace('<TOPIC_ID>', this.get('topic.id')).replace('<USER_ID>', this.currentUser.id).replace('<USERNAME>', this.currentUser.username).replace('<TOPIC_TITLE>', this.get('topic.title')).replace('<TOPIC_SLUG>', this.get('topic.slug'));
      window.open(url+"?pathName="+pathName, '_blank');
    }
  }
};
