# ContextKeys - Thunderbird Keyboard Shortcuts Display Addon

Display Thunderbird keyboard shortcuts in a context-aware popup. This addon shows the most relevant shortcuts based on your current screen (Mail, Calendar, Address Book, or Tasks).

## ✨ Features

- **Context-aware shortcuts**: Automatically detects whether you're in Mail, Calendar, Address Book, or Tasks and shows relevant shortcuts
- **Real-time search**: Quickly search shortcuts by key or description
- **Dark mode support**: Automatically adapts to your OS dark mode setting
- **156 shortcuts**: Comprehensive coverage of Common, Mail, Calendar, Address Book, and Tasks contexts
- **Multilingual**: Supports Japanese and English with automatic language detection

## 🚀 Installation

### Requirements

- Thunderbird 128.0 or later

### Installation Steps

1. Download the XPI file from the [Releases](../../releases) page
2. Open Thunderbird
3. Go to "Tools" → "Add-ons"
4. Click the gear icon in the top right → "Install Add-on from File"
5. Select the downloaded XPI file

## 💡 Usage

### Basic Usage

1. Open any tab in Thunderbird (Mail, Calendar, Address Book, etc.)
2. Press **`Ctrl + Shift + H`**
3. A popup will display the available shortcuts for your current context
4. Use the search box to find specific shortcuts
5. Press **`Esc`** or close the window to dismiss the popup

### Supported Contexts

| Context | Description |
|---------|-------------|
| **Mail** | Shortcuts for mail list, message viewing, and compose windows |
| **Calendar** | Event and schedule management shortcuts |
| **Address Book** | Contact management shortcuts |
| **Tasks** | Task and to-do list shortcuts |
| **Common** | Shortcuts available across all contexts |

## 📊 Implementation Details

- **Common**: 18 shortcuts
- **Mail**: 70 shortcuts
- **Calendar**: 28 shortcuts
- **Address Book**: 19 shortcuts
- **Tasks**: 21 shortcuts
- **Total**: 156 keyboard shortcuts

## 🌍 Multilingual Support

- **Supported languages**: Japanese (ja) and English (en)
- **Automatic language detection**: Displays in your system language
  - Japanese environment → Japanese display
  - Other environments → English display (fallback)
- **All 156 shortcuts**: Available in both Japanese and English
- **UI elements**: Dialog title, search box, and messages are fully translated

## 📄 License

MIT License

## 🤝 Support

If you encounter any issues or have feature suggestions, please report them in the [Issues](../../issues) section of this repository.

---

**Version**: 1.0.0
