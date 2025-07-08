console.log("📩 Email Writer Extension - content script loaded");

// Utility to get email content
function getEmailContent() {
  const selectors = ['.h7', '.a3s.aiL', '[role="presentation"]', '.gmail_quote'];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return '';
}

// Utility to find Gmail toolbar inside compose box
function findComposeToolbar() {
  const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null;
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'ai-reply-button';
    button.textContent = 'AI Reply';
  
    // Gmail "Send" button styles
    button.style.backgroundColor = '#1a73e8';
    button.style.color = '#ffffff';
    button.style.borderRadius = '18px';
    button.style.height = '36px';
    button.style.lineHeight = '36px';
    button.style.padding = '0 24px';
    button.style.fontWeight = '500';
    button.style.fontSize = '14px';
    button.style.textAlign = 'center';
    button.style.cursor = 'pointer';
    button.style.marginRight = '8px';
    button.style.transition = 'box-shadow 0.2s ease, background-color 0.2s ease';
  
    // Optional: Hover effect
    button.addEventListener('mouseover', () => {
      button.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.15)';
      button.style.backgroundColor = '#1967d2'; // darker Gmail blue
    });
    button.addEventListener('mouseout', () => {
      button.style.boxShadow = 'none';
      button.style.backgroundColor = '#1a73e8'; // original Gmail blue
    });
  
    return button;
  }
  

// Injects the AI Reply button into compose toolbar
function injectButton() {
  console.log("🚀 Injecting AI Reply button...");
  const existingButton = document.querySelector('.ai-reply-button');
  if (existingButton) {
    existingButton.remove();
  }

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("⚠️ Toolbar not found");
    return;
  }

  const button = createAIButton();

  button.addEventListener('click', async () => {
    try {
      button.innerText = 'Generating...';
      button.style.opacity = '0.6';
      button.style.pointerEvents = 'none';

      const emailContent = getEmailContent();
      const response = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: 'professional', // Optional: you can make this dynamic later
        }),
      });

      if (!response.ok) {
        throw new Error('API Request Failed');
      }

      const generatedReply = await response.text();
      const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

      if (composeBox) {
        composeBox.focus();
        document.execCommand('insertText', false, generatedReply);
      } else {
        console.error('⚠️ Compose box not found');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate a reply.');
    } finally {
      button.innerText = 'AI Reply';
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

// Observe Gmail DOM for compose windows
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);

    const hasComposeElements = addedNodes.some((node) => {
      return node.nodeType === Node.ELEMENT_NODE &&
        (node.matches?.('.aDh, .btC, [role="dialog"]') ||
         node.querySelector?.('.aDh, .btC, [role="dialog"]'));
    });

    if (hasComposeElements) {
      console.log("📝 Compose window detected");
      setTimeout(injectButton, 500); // Delay to let Gmail fully render
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
