function detectLinkType(link:any) {
    // 常见的图片文件扩展名
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    // 常见的视频文件扩展名
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    // 将链接转换为小写，方便统一比较
    const lowerCaseLink = link.toLowerCase();
    // 检查是否为图片链接
    if (imageExtensions.some(ext => lowerCaseLink.endsWith(ext))) {
        return '图片';
    } 
    // 检查是否为视频链接
    else if (videoExtensions.some(ext => lowerCaseLink.endsWith(ext))) {
        return '视频';
    }
    // 若都不是，则返回未知
    return '未知';
}
export { detectLinkType };