export const getTaskContent = t => {
    switch (t) {
        case "关注":
            return "点击主播头像的小加号，直到加号消失";
        case "点赞":
            return "双击屏幕，看到小红心变红";
        case "评论":
            return "点击三个点的评论按钮，进行评论（不少于10个字），并至少点赞3个他人评论";
        default:
            return "";
    }
}

export const testImg = e => {
    if (e == null) {
        return true
    } else if (e instanceof Event) {
        let file = e.target.files[0];
        if (file.type.match(/image.*/)) {
            return true;
        }
    } else if (typeof e == 'string') {
        switch (e.slice(-3).toLocaleLowerCase()) {
            case 'png':
            case 'jpg':
            case 'peg':
                return true
        }
    }
    return false
};

export const dy_regex = v => {
    let r = /.+http.+\/\/.+\/.+/.test(v);
    return r;
};