/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 3/4/14
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */
function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>')
}

function processUserInput(chatApp, socket) {
    var message = $("#send-message").val(),
        systemMessage;

    if (message.charAt(0) === "/") {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $("#messages").append(divSystemContentElement(systemMessage));
        } else {
            chatApp.sendMessage($("#room").text(), message);
            $("#messages").append(divEscapedContentElement(message));
            $("#messages").scrollTop($("#messages").prop('scrollHeight'));
        }
        $("#send-message").val('');
    }
}