/*
 * dmuploader.min.js - Jquery File Uploader - 0.1
 * http://www.daniel.com.uy/projects/jquery-file-uploader/
 * 
 * Copyright (c) 2013 Daniel Morales
 * Dual licensed under the MIT and GPL licenses.
 * http://www.daniel.com.uy/doc/license/
 */
(function(t){var n="dmUploader";var r={url:document.URL,method:"POST",extraData:{},maxFileSize:0,allowedTypes:"*",extFilter:null,dataType:null,fileName:"file",onInit:function(){},onFallbackMode:function(){message},onNewFile:function(e,t){},onBeforeUpload:function(e){},onComplete:function(){},onUploadProgress:function(e,t){},onUploadSuccess:function(e,t){},onUploadError:function(e,t){},onFileTypeError:function(e){},onFileSizeError:function(e){},onFileExtError:function(e){}};var i=function(e,n){this.element=t(e);this.settings=t.extend({},r,n);if(!this.checkBrowser()){return false}this.init();return true};i.prototype.checkBrowser=function(){if(window.FormData===undefined){this.settings.onFallbackMode.call(this.element,"Browser doesn't support Form API");return false}if(this.element.find("input[type=file]").length>0){return true}if(!this.checkEvent("drop",this.element)||!this.checkEvent("dragstart",this.element)){this.settings.onFallbackMode.call(this.element,"Browser doesn't support Ajax Drag and Drop");return false}return true};i.prototype.checkEvent=function(e,t){var t=t||document.createElement("div");var e="on"+e;var n=e in t;if(!n){if(!t.setAttribute){t=document.createElement("div")}if(t.setAttribute&&t.removeAttribute){t.setAttribute(e,"");n=typeof t[e]=="function";if(typeof t[e]!="undefined"){t[e]=undefined}t.removeAttribute(e)}}t=null;return n};i.prototype.init=function(){var e=this;e.queue=new Array;e.queuePos=-1;e.queueRunning=false;e.element.on("drop",function(t){t.preventDefault();var n=t.originalEvent.dataTransfer.files;e.queueFiles(n)});e.element.find("input[type=file]").on("change",function(n){var r=n.target.files;e.queueFiles(r);t(this).val("")});this.settings.onInit.call(this.element)};i.prototype.queueFiles=function(e){var n=this.queue.length;for(var r=0;r<e.length;r++){var i=e[r];if(this.settings.maxFileSize>0&&i.size>this.settings.maxFileSize){this.settings.onFileSizeError.call(this.element,i);continue}if(this.settings.allowedTypes!="*"&&!i.type.match(this.settings.allowedTypes)){this.settings.onFileTypeError.call(this.element,i);continue}if(this.settings.extFilter!=null){var s=this.settings.extFilter.toLowerCase().split(";");var o=i.name.toLowerCase().split(".").pop();if(t.inArray(o,s)<0){this.settings.onFileExtError.call(this.element,i);continue}}this.queue.push(i);var u=this.queue.length-1;this.settings.onNewFile.call(this.element,u,i)}if(this.queueRunning){return false}if(this.queue.length==n){return false}this.processQueue();return true};i.prototype.processQueue=function(){var n=this;n.queuePos++;if(n.queuePos>=n.queue.length){n.settings.onComplete.call(n.element);n.queuePos=n.queue.length-1;n.queueRunning=false;return}var r=n.queue[n.queuePos];var i=new FormData;i.append(n.settings.fileName,r);n.settings.onBeforeUpload.call(n.element,n.queuePos);t.each(n.settings.extraData,function(e,t){i.append(e,t)});n.queueRunning=true;t.ajax({url:n.settings.url,type:n.settings.method,dataType:n.settings.dataType,data:i,cache:false,contentType:false,processData:false,forceSync:false,xhr:function(){var r=t.ajaxSettings.xhr();if(r.upload){r.upload.addEventListener("progress",function(t){var r=0;var i=t.loaded||t.position;var s=t.total||e.totalSize;if(t.lengthComputable){r=Math.ceil(i/s*100)}n.settings.onUploadProgress.call(n.element,n.queuePos,r)},false)}return r},success:function(e,t,r){n.settings.onUploadSuccess.call(n.element,n.queuePos,e)},error:function(e,t,r){n.settings.onUploadError.call(n.element,n.queuePos,r)},complete:function(e,t){n.processQueue()}})};t.fn.dmUploader=function(e){return this.each(function(){if(!t.data(this,n)){t.data(this,n,new i(this,e))}})};t(document).on("dragenter",function(e){e.stopPropagation();e.preventDefault()});t(document).on("dragover",function(e){e.stopPropagation();e.preventDefault()});t(document).on("drop",function(e){e.stopPropagation();e.preventDefault()})})(jQuery)
