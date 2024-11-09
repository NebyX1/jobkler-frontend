import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import MarkdownIt from "markdown-it";

// Inicializar markdown-it con configuración básica
const mdParser = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

// Función para convertir Markdown a componentes de @react-pdf/renderer
const renderMarkdown = (markdownText) => {
  const tokens = mdParser.parse(markdownText, {});
  const elements = [];
  let currentList = null;
  let listType = null; // 'bullet' o 'ordered'

  const parseInlineTokens = (children) => {
    const elements = [];
    let i = 0;

    while (i < children.length) {
      const token = children[i];

      switch (token.type) {
        case 'text':
          elements.push(token.content);
          break;

        case 'strong_open':
          let strongContent = '';
          i++;
          while (i < children.length && children[i].type !== 'strong_close') {
            if (children[i].type === 'text') {
              strongContent += children[i].content;
            }
            i++;
          }
          elements.push(
            <Text style={styles.boldText} key={`strong-${i}`}>
              {strongContent}
            </Text>
          );
          break;

        case 'em_open':
          let emContent = '';
          i++;
          while (i < children.length && children[i].type !== 'em_close') {
            if (children[i].type === 'text') {
              emContent += children[i].content;
            }
            i++;
          }
          elements.push(
            <Text style={styles.italicText} key={`em-${i}`}>
              {emContent}
            </Text>
          );
          break;

        case 'link_open':
          let href = '#';
          const hrefAttr = token.attrs?.find(attr => attr[0] === 'href');
          if (hrefAttr) {
            href = hrefAttr[1];
          }
          let linkText = '';
          i++;
          while (i < children.length && children[i].type !== 'link_close') {
            if (children[i].type === 'text') {
              linkText += children[i].content;
            }
            i++;
          }
          elements.push(
            <Link src={href} style={styles.link} key={`link-${i}`}>
              {linkText}
            </Link>
          );
          // Agregar espacio después del enlace para evitar que el texto quede pegado
          elements.push(" ");
          break;

        default:
          elements.push(token.content || '');
          break;
      }

      i++;
    }

    return elements;
  };

  tokens.forEach((token, index) => {
    switch (token.type) {
      case 'paragraph_open':
      case 'paragraph_close':
      case 'heading_open':
      case 'heading_close':
        // Ignorar por ahora
        break;

      case 'bullet_list_open':
      case 'ordered_list_open':
        currentList = [];
        listType = token.type === 'bullet_list_open' ? 'bullet' : 'ordered';
        break;

      case 'bullet_list_close':
      case 'ordered_list_close':
        if (currentList) {
          elements.push(
            <View style={styles.list} key={`list-${index}`}>
              {currentList.map((item, idx) => (
                <View style={styles.listItem} key={`list-item-${idx}`}>
                  <Text style={styles.bullet}>
                    {listType === 'ordered' ? `${idx + 1}.` : '•'}
                  </Text>
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </View>
          );
          currentList = null;
          listType = null;
        }
        break;

      case 'list_item_open':
        // Iniciar un nuevo ítem de lista
        break;

      case 'list_item_close':
        // Finalizar el ítem de lista
        break;

      case 'inline':
        const content = parseInlineTokens(token.children);
        if (currentList !== null) {
          currentList.push(content);
        } else {
          elements.push(
            <Text style={styles.sectionContent} key={`paragraph-${index}`}>
              {content.map((item, idx) => (
                <React.Fragment key={idx}>{item}</React.Fragment>
              ))}
            </Text>
          );
        }
        break;

      default:
        break;
    }
  });

  return elements;
};

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    color: "#333",
    fontSize: 12,
    lineHeight: 1.5,
  },
  nameSection: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  contactInfo: {
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
    textDecoration: "underline",
  },
  sectionContent: {
    marginBottom: 10,
    textAlign: "justify",
    flexWrap: 'wrap',
  },
  boldText: {
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  list: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  bullet: {
    width: 20,
    fontSize: 12,
    color: "#333",
  },
  listItemText: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
});

const ResumePDF = ({ profile }) => (
  <Document>
    <Page style={styles.page}>
      {/* Sección de Nombre */}
      <View style={styles.nameSection}>
        <Text style={styles.name}>{`${profile.name} ${profile.surname}`}</Text>
      </View>

      {/* Información de contacto */}
      <View style={styles.contactInfo}>
        <Text>{`Teléfono: ${profile.phone}`}</Text>
        <Text>{`Correo electrónico: ${profile.email}`}</Text>
      </View>

      {/* Sección "Sobre mí" */}
      <Text style={styles.sectionTitle}>Sobre mí</Text>
      <View>{renderMarkdown(profile.about)}</View>

      {/* Sección "Descripción" */}
      {profile.description && (
        <>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <View>{renderMarkdown(profile.description)}</View>
        </>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
